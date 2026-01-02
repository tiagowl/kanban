'use client'

import Link from 'next/link'

interface HeaderProps {
  title?: string
  showBack?: boolean
  backHref?: string
  actions?: React.ReactNode
}

export function Header({ title, showBack, backHref = '/', actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {showBack && (
              <Link
                href={backHref}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
                aria-label="Voltar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            )}
            {title && (
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            )}
            {!title && (
              <Link href="/" className="text-xl font-bold text-primary-600">
                Sistema Kanban
              </Link>
            )}
          </div>
          
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

