'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Project, ViewMode } from '@/types'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { TaskListView } from '@/components/tasks/TaskListView'
import { LabelManager } from '@/components/labels/LabelManager'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LayoutGrid, List, Tag } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode | 'labels'>('kanban')

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    const savedViewMode = localStorage.getItem(`viewMode-${params.id}`) as ViewMode | null
    if (savedViewMode && savedViewMode !== 'labels') {
      setViewMode(savedViewMode)
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

  const handleViewModeChange = (mode: ViewMode | 'labels') => {
    setViewMode(mode)
    if (mode !== 'labels') {
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
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/projects')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{project.name}</h1>
              {project.description && (
                <p className="text-sm text-muted-foreground">{project.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleViewModeChange('kanban')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleViewModeChange('list')}
            >
              <List className="h-4 w-4 mr-2" />
              Lista
            </Button>
            <Button
              variant={viewMode === 'labels' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleViewModeChange('labels')}
            >
              <Tag className="h-4 w-4 mr-2" />
              Etiquetas
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {viewMode === 'kanban' ? (
          <KanbanBoard projectId={params.id as string} />
        ) : viewMode === 'list' ? (
          <TaskListView projectId={params.id as string} />
        ) : (
          <LabelManager projectId={params.id as string} />
        )}
      </main>
    </div>
  )
}
