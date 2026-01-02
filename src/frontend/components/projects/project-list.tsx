'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api/client'
import type { Projeto } from '@/lib/types'
import { ProjectCard } from './project-card'
import { Loading } from '@/components/shared/loading'

export function ProjectList() {
  const [projects, setProjects] = useState<Projeto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await api.get<Projeto[]>('/projects')
      
      if (response.success && response.data) {
        setProjects(response.data)
      } else {
        setError(response.error?.message || 'Erro ao carregar projetos')
      }
    } catch (err) {
      setError('Erro ao carregar projetos')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-error-500 mb-4">{error}</p>
        <button
          onClick={loadProjects}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Nenhum projeto criado ainda
        </h2>
        <p className="text-gray-600 mb-6">
          Crie seu primeiro projeto para começar a organizar suas tarefas
        </p>
        <a
          href="/dashboard/projects/new"
          className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-lg"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Criar Primeiro Projeto
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <a
        href="/dashboard/projects/new"
        className="flex items-center justify-center min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-gray-600 hover:text-primary-600"
      >
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <p className="font-medium">Criar Projeto</p>
        </div>
      </a>
    </div>
  )
}

