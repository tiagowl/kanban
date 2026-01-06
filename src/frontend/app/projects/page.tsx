'use client'

import { useProjects } from '@/hooks/useProjects'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, LogOut, LayoutGrid, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ProjectForm } from '@/components/projects/ProjectForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { Project } from '@/types'
import { useToast } from '@/components/ui/use-toast'

export default function ProjectsPage() {
  const { projects, loading, deleteProject, refetch } = useProjects()
  const { logout, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsEditOpen(true)
  }

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedProject) {
      try {
        await deleteProject(selectedProject.id)
        setIsDeleteConfirmOpen(false)
        setSelectedProject(null)
        await refetch()
      } catch (error) {
        console.error('Error deleting project:', error)
        toast({
          title: 'Erro',
          description: 'Não foi possível excluir o projeto.',
          variant: 'destructive',
        })
      }
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <LayoutGrid className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              <h1 className="text-lg sm:text-2xl font-bold truncate">Sistema Kanban</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="flex-shrink-0">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Meus Projetos</h2>
          <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">Você ainda não tem projetos</p>
            <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Projeto
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  {project.description && (
                    <CardDescription>{project.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {project.stages?.length || 0} etapas
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2">
                  <Button asChild className="w-full sm:flex-1">
                    <Link href={`/projects/${project.id}`}>Abrir</Link>
                  </Button>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      className="flex-1 sm:flex-initial"
                      title="Editar projeto"
                    >
                      <Edit2 className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Editar</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(project)}
                      className="flex-1 sm:flex-initial"
                      title="Excluir projeto"
                    >
                      <Trash2 className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Excluir</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Dialog para criar novo projeto */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Projeto</DialogTitle>
          </DialogHeader>
          <ProjectForm
            onSuccess={async () => {
              setIsCreateOpen(false)
              await refetch()
            }}
            onCancel={() => setIsCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog para editar projeto */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
            <DialogDescription>
              Atualize as informações do projeto
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <ProjectForm
              initialData={{
                id: selectedProject.id,
                name: selectedProject.name,
                description: selectedProject.description || undefined,
              }}
              onSuccess={async () => {
                setIsEditOpen(false)
                setSelectedProject(null)
                await refetch()
              }}
              onCancel={() => {
                setIsEditOpen(false)
                setSelectedProject(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o projeto &quot;{selectedProject?.name}&quot;?
              <span className="block mt-2 text-destructive font-semibold">
                Esta ação irá excluir permanentemente:
              </span>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1 text-muted-foreground">
                <li>O projeto</li>
                <li>Todas as etapas do projeto</li>
                <li>Todas as tarefas</li>
                <li>Todas as sub-tarefas</li>
                <li>Todas as etiquetas</li>
              </ul>
              <span className="block mt-2 font-semibold">
                Esta ação não pode ser desfeita.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir Projeto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

