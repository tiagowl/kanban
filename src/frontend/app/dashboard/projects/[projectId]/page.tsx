'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/shared/header'
import { Board } from '@/components/kanban/board'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api/client'
import type { Projeto } from '@/lib/types'
import { Loading } from '@/components/shared/loading'
import Link from 'next/link'

export default function ProjectBoardPage({
  params,
}: {
  params: { projectId: string }
}) {
  const [project, setProject] = useState<Projeto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProject()
  }, [params.projectId])

  const loadProject = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.get<Projeto>(`/projects/${params.projectId}`)
      if (!response.success || !response.data) {
        throw new Error(response.error?.message || 'Erro ao carregar projeto')
      }

      setProject(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar projeto')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Loading />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Header
          showBack
          backHref="/dashboard"
          title="Erro"
        />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar projeto</h2>
            <p className="text-gray-600 mb-6">{error || 'Projeto não encontrado'}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary" onClick={loadProject}>
                Tentar novamente
              </Button>
              <Link href="/dashboard">
                <Button variant="secondary">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header melhorado */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
                aria-label="Voltar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  {project.nome}
                </h1>
                {project.descricao && (
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {project.descricao}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="small">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nova Etapa
              </Button>
              <Button variant="secondary" size="small">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Board projectId={params.projectId} projectName={project.nome} />
      </main>
    </div>
  )
}

