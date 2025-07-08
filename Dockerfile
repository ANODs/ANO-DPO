# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci -f; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Принимаем токен и chat_id как build-arg и делаем их ENV-переменными
ARG NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
ARG NEXT_PUBLIC_TELEGRAM_CHAT_ID
ENV NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=${NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}
ENV NEXT_PUBLIC_TELEGRAM_CHAT_ID=${NEXT_PUBLIC_TELEGRAM_CHAT_ID}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js собирает анонимную телеметрию. Отключение при необходимости:
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# На случай, если хотите, чтобы в runtime тоже были дефолтные значения
ARG NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
ARG NEXT_PUBLIC_TELEGRAM_CHAT_ID
ENV NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=${NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}
ENV NEXT_PUBLIC_TELEGRAM_CHAT_ID=${NEXT_PUBLIC_TELEGRAM_CHAT_ID}

ENV NODE_ENV=production
# Отключить телеметрию во время runtime:
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Автоматически используем сборку output traces для уменьшения размера
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js создаётся next build из standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]
