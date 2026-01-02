'use client'

import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  clickable?: boolean
}

export function Card({ children, hover = false, clickable = false, className = '', ...props }: CardProps) {
  const baseClasses = 'bg-white border border-gray-200 rounded-lg p-4 shadow transition-all duration-150'
  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''
  const clickableClasses = clickable ? 'cursor-pointer' : ''

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

