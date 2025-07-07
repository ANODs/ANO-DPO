"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useCallbackForm } from "@/contexts/callback-form-context"
import { callbackFormSchema, type CallbackFormData } from "@/lib/callback-form-schema"
import { toast } from "sonner"

export function CallbackForm() {
  const { isOpen, closeForm } = useCallbackForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackFormSchema),
  })

  const consentValue = watch("consent")

  const onSubmit = async (data: CallbackFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        // Показываем конкретную ошибку от сервера
        toast.error(result.error || "Произошла ошибка при отправке заявки")
        
        // Если есть детали ошибок валидации, показываем их
        if (result.details) {
          console.error("Validation errors:", result.details)
        }
        return
      }

      // Успешная отправка
      toast.success(result.message || "Заявка успешно отправлена!")
      reset()
      closeForm()
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Произошла ошибка при отправке заявки. Проверьте подключение к интернету.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[320px] sm:max-w-md lg:max-w-lg relative">
        {/* Заголовок с кнопкой закрытия */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-center flex-1">
            Заявка на обратный звонок
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeForm}
            className="h-8 w-8 p-0 ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4">
          {/* Фамилия */}
          <div className="space-y-2">
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder="Фамилия"
              className={`rounded-lg border-gray-300 ${errors.lastName ? "border-red-500" : ""}`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          {/* Имя */}
          <div className="space-y-2">
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="Имя"
              className={`rounded-lg border-gray-300 ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          {/* Отчество */}
           <div className="space-y-2">
             <Input
               id="middleName"
               {...register("middleName")}
               placeholder="Отчество"
               className={`rounded-lg border-gray-300 ${errors.middleName ? "border-red-500" : ""}`}
             />
             {errors.middleName && (
               <p className="text-sm text-red-500">{errors.middleName.message}</p>
             )}
           </div>

          {/* Телефон */}
          <div className="space-y-2">
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Телефон"
              className={`rounded-lg border-gray-300 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              className={`rounded-lg border-gray-300 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Чекбокс согласия */}
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="consent"
              checked={consentValue || false}
              onCheckedChange={(checked) => setValue("consent", checked as boolean)}
              className={`mt-0.5 ${errors.consent ? "border-red-500" : ""}`}
            />
            <Label htmlFor="consent" className="text-xs sm:text-sm leading-4 text-gray-600">
              Отправляя форму, вы даёте{" "}
              <a
                href="/documents/29"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                согласие на обработку персональных данных
              </a>
            </Label>
          </div>
          {errors.consent && (
            <p className="text-sm text-red-500">{errors.consent.message}</p>
          )}

          {/* Кнопка отправки */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-3 mt-6"
          >
            {isSubmitting ? "Отправка..." : "Отправить"}
          </Button>
        </form>
      </div>
    </div>
  )
}