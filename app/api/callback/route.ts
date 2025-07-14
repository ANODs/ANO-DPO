import { NextRequest, NextResponse } from 'next/server';
import { callbackFormSchema } from '@/lib/callback-form-schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = callbackFormSchema.parse(body);

    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    const unisenderApiUrl = process.env.UNISENDER_API_URL;

    if (!botToken || !chatId || !unisenderApiUrl) {
      console.error('Configuration missing:', {
        botToken: !!botToken,
        chatId: !!chatId,
        unisenderApiUrl: !!unisenderApiUrl,
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Конфигурация отправки отсутствует. Обратитесь к администратору.',
        },
        { status: 500 },
      );
    }

    // --- Отправка в Telegram ---
    const telegramPromise = fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🔔 Новая заявка на обратный звонок\n\n👤 ФИО: ${validatedData.lastName} ${validatedData.firstName} ${validatedData.middleName}\n📞 Телефон: ${validatedData.phone}\n📧 Email: ${validatedData.email}\n\n✅ Согласие на обработку данных: Да`,
        parse_mode: 'Markdown',
      }),
    });

    // --- Отправка в Unisender ---
    const unisenderPromise = fetch(unisenderApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'contact.anodpo@yandex.ru',
        contactEmail: validatedData.email,
        contactPhone: validatedData.phone,
        lastName: validatedData.lastName,
        firstName: validatedData.firstName,
        middleName: validatedData.middleName,
        consentToProcessing: validatedData.consent,
      }),
    });

    const results = await Promise.allSettled([telegramPromise, unisenderPromise]);

    const successful = results.every((result) => result.status === 'fulfilled' && result.value.ok);

    if (!successful) {
      results.forEach((result, index) => {
        if (result.status === 'rejected' || !result.value.ok) {
          const service = index === 0 ? 'Telegram' : 'Unisender';
          console.error(`Error sending to ${service}:`, result);
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.',
        },
        { status: 500 },
      );
    }

    console.log('Application sent successfully to all services.');

    return NextResponse.json(
      {
        success: true,
        message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
      },
      { status: 200 },
    );
    
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