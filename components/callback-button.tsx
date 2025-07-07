'use client'

import React from 'react'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCallbackForm } from '@/contexts/callback-form-context'

interface CallbackButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  children?: React.ReactNode
}

export function CallbackButton({ 
  variant = 'default', 
  size = 'default', 
  className = '',
  children
}: CallbackButtonProps) {
  const { openForm } = useCallbackForm()

  return (
    <Button
      onClick={openForm}
      variant={variant}
      size={size}
      className={`${className}`}
    >
      {children || (
        <>
          <Phone className="w-4 h-4 mr-2" />
          Обратный звонок
        </>
      )}
    </Button>
  )
}