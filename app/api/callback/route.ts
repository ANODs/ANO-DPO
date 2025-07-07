import { NextRequest, NextResponse } from 'next/server'
import { callbackFormSchema, type CallbackFormData } from '@/lib/callback-form-schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация данных формы
    const validatedData = callbackFormSchema.parse(body)
    
    // Получение конфигурации Telegram из переменных окружения
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
    
    if (!botToken || !chatId) {
      console.error('Telegram configuration missing:', { botToken: !!botToken, chatId: !!chatId })
      return NextResponse.json(
        { 
          success: false, 
          error: 'Конфигурация Telegram отсутствует. Обратитесь к администратору.' 
        },
        { status: 500 }
      )
    }
    
    // Формирование сообщения для Telegram
    const message = `🔔 Новая заявка на обратный звонок\n\n` +
      `👤 ФИО: ${validatedData.lastName} ${validatedData.firstName} ${validatedData.middleName}\n` +
      `📞 Телефон: ${validatedData.phone}\n` +
      `📧 Email: ${validatedData.email}\n\n` +
      `✅ Согласие на обработку данных: Да`
    
    // Отправка в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    )
    
    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error('Telegram API error:', errorData)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ошибка отправки сообщения в Telegram. Попробуйте позже.' 
        },
        { status: 500 }
      )
    }
    
    const telegramData = await telegramResponse.json()
    console.log('Message sent successfully:', telegramData.message_id)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Callback form error:', error)
    
    // Обработка ошибок валидации Zod
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as any
      const fieldErrors = zodError.issues.map((issue: any) => 
        `${issue.path.join('.')}: ${issue.message}`
      ).join(', ')
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Проверьте правильность заполнения полей формы',
          details: fieldErrors
        },
        { status: 400 }
      )
    }
    
    // Обработка ошибок сети
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ошибка сети. Проверьте подключение к интернету.' 
        },
        { status: 503 }
      )
    }
    
    // Общая обработка ошибок
    return NextResponse.json(
      { 
        success: false, 
        error: 'Произошла внутренняя ошибка сервера. Попробуйте позже.' 
      },
      { status: 500 }
    )
  }
}