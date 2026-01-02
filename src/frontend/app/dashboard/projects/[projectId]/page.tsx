import { Header } from '@/components/shared/header'
import { Board } from '@/components/kanban/board'
import { Button } from '@/components/ui/button'

export default function ProjectBoardPage({
  params,
}: {
  params: { projectId: string }
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        showBack
        backHref="/dashboard"
        title={`Projeto: ${params.projectId}`}
        actions={
          <>
            <Button variant="secondary" size="small">
              + Etapa
            </Button>
            <Button variant="secondary" size="small">
              Config
            </Button>
          </>
        }
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Board projectId={params.projectId} />
      </main>
    </div>
  )
}

