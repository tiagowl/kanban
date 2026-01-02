import { Header } from '@/components/shared/header'
import { ProjectList } from '@/components/projects/project-list'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Meus Projetos"
        actions={
          <a
            href="/dashboard/projects/new"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Projeto
          </a>
        }
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectList />
      </main>
    </div>
  )
}

