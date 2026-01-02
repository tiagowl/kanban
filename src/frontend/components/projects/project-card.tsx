'use client'

import Link from 'next/link'
import type { Projeto } from '@/lib/types'

interface ProjectCardProps {
  project: Projeto
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span>📁</span>
            {project.nome}
          </h3>
        </div>
        
        {project.descricao && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
            {project.descricao}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Atualizado: {new Date(project.atualizado_em).toLocaleDateString('pt-BR')}
            </span>
            <span className="text-primary-600 hover:text-primary-700 font-medium">
              Abrir →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

