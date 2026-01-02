'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/shared/header'
import { ProjectForm } from '@/components/projects/project-form'
import type { Projeto } from '@/lib/types'

export default function ProjectFormPage() {
  const router = useRouter()

  const handleSuccess = (project: Projeto) => {
    router.push(`/dashboard/projects/${project.id}`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBack backHref="/dashboard" title="Criar Novo Projeto" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow p-6">
          <ProjectForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </main>
    </div>
  )
}

