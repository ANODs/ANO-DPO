import { z } from 'zod'

export const callbackFormSchema = z.object({
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  middleName: z.string().min(2, 'Отчество должно содержать минимум 2 символа'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email адрес'),
  consent: z.boolean().refine(val => val === true, {
    message: 'Необходимо дать согласие на обработку персональных данных'
  })
})

export type CallbackFormData = z.infer<typeof callbackFormSchema>

export interface TelegramConfig {
  botToken: string
  chatId: string
}