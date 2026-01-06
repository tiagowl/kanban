'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Project, ViewMode } from '@/types'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { TaskListView } from '@/components/tasks/TaskListView'
import { LabelManager } from '@/components/labels/LabelManager'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LayoutGrid, List, Tag, Columns } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { StageManager } from '@/components/stages/StageManager'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode | 'labels' | 'stages'>('kanban')

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    const savedViewMode = localStorage.getItem(`viewMode-${params.id}`)
    if (savedViewMode && (savedViewMode === 'kanban' || savedViewMode === 'list')) {
      setViewMode(savedViewMode as ViewMode)
    }
  }, [params.id])

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await api.get<Project>(`/projects/${params.id}`)
        setProject(data)
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar o projeto',
          variant: 'destructive',
        })
        router.push('/projects')
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [params.id, router, toast])

  const handleViewModeChange = (mode: ViewMode | 'labels' | 'stages') => {
    setViewMode(mode)
    if (mode !== 'labels' && mode !== 'stages') {
      localStorage.setItem(`viewMode-${params.id}`, mode)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirecionamento em andamento
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => router.push('/projects')}
                className="flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold truncate">{project.name}</h1>
                {project.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewModeChange('kanban')}
                className="flex-shrink-0"
              >
                <LayoutGrid className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Kanban</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewModeChange('list')}
                className="flex-shrink-0"
              >
                <List className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Lista</span>
              </Button>
              <Button
                variant={viewMode === 'stages' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewModeChange('stages')}
                className="flex-shrink-0"
              >
                <Columns className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Etapas</span>
              </Button>
              <Button
                variant={viewMode === 'labels' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewModeChange('labels')}
                className="flex-shrink-0"
              >
                <Tag className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Etiquetas</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {viewMode === 'kanban' ? (
          <KanbanBoard projectId={params.id as string} />
        ) : viewMode === 'list' ? (
          <TaskListView projectId={params.id as string} />
        ) : viewMode === 'stages' ? (
          <StageManager projectId={params.id as string} />
        ) : (
          <LabelManager projectId={params.id as string} />
        )}
      </main>
    </div>
  )
}
