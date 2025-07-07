'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { type TelegramConfig } from '@/lib/callback-form-schema'

interface CallbackFormContextType {
  isOpen: boolean
  openForm: () => void
  closeForm: () => void
  telegramConfig: TelegramConfig
  setTelegramConfig: (config: TelegramConfig) => void
}

const CallbackFormContext = createContext<CallbackFormContextType | undefined>(undefined)

interface CallbackFormProviderProps {
  children: ReactNode
  defaultTelegramConfig?: TelegramConfig
}

export function CallbackFormProvider({ 
  children, 
  defaultTelegramConfig = {
    botToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || ''
  }
}: CallbackFormProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>(defaultTelegramConfig)

  const openForm = () => setIsOpen(true)
  const closeForm = () => setIsOpen(false)

  return (
    <CallbackFormContext.Provider value={{
      isOpen,
      openForm,
      closeForm,
      telegramConfig,
      setTelegramConfig
    }}>
      {children}
    </CallbackFormContext.Provider>
  )
}

export function useCallbackForm() {
  const context = useContext(CallbackFormContext)
  if (context === undefined) {
    throw new Error('useCallbackForm must be used within a CallbackFormProvider')
  }
  return context
}