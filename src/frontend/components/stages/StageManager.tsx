'use client'

import { useState } from 'react'
import { useStages } from '@/hooks/useStages'
import { Stage } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { StageForm } from './StageForm'
import { StageCard } from './StageCard'
import { useToast } from '@/components/ui/use-toast'
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { api } from '@/lib/api'

interface StageManagerProps {
  projectId: string
}

export function StageManager({ projectId }: StageManagerProps) {
  const { stages, loading, deleteStage, fetchStages, updateStage } = useStages(projectId)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeStage, setActiveStage] = useState<Stage | null>(null)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleEdit = (stage: Stage) => {
    setSelectedStage(stage)
    setIsEditOpen(true)
  }

  const handleDeleteClick = (stage: Stage) => {
    setSelectedStage(stage)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedStage) {
      try {
        await deleteStage(selectedStage.id)
        setIsDeleteConfirmOpen(false)
        setSelectedStage(null)
        fetchStages()
      } catch (error) {
        console.error('Error deleting stage:', error)
      }
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const stageId = event.active.id as string
    setActiveId(stageId)
    const stage = stages.find((s) => s.id === stageId)
    setActiveStage(stage || null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null)
    setActiveStage(null)

    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const activeIndex = stages.findIndex((s) => s.id === active.id)
    const overIndex = stages.findIndex((s) => s.id === over.id)

    if (activeIndex === -1 || overIndex === -1) {
      return
    }

    const movedStage = stages[activeIndex]
    const newOrder = overIndex

    // Se a ordem não mudou, não fazer nada
    if (movedStage.order === newOrder) {
      return
    }

    try {
      // O backend vai cuidar de reordenar todas as outras etapas
      // skipToast=true para evitar toast duplicado, já que vamos mostrar um próprio
      await updateStage(movedStage.id, { order: newOrder }, true)
      
      // Recarregar para garantir sincronização
      await fetchStages()

      toast({
        title: 'Sucesso',
        description: 'Etapas reordenadas com sucesso!',
      })
    } catch (error) {
      console.error('Error reordering stages:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível reordenar as etapas',
        variant: 'destructive',
      })
      // Recarregar para restaurar o estado original
      await fetchStages()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="ml-2 text-muted-foreground">Carregando etapas...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Gerenciar Etapas</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Organize as etapas do seu fluxo de trabalho
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Etapa
        </Button>
      </div>

      {stages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center mb-4">
              Nenhuma etapa criada ainda. Crie etapas para organizar suas tarefas.
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Etapa
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={stages.map((s) => s.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stages.map((stage, index) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  index={index}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeStage ? (
              <Card className="rotate-3 opacity-90 w-full max-w-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 text-muted-foreground" />
                    <p className="font-semibold">{activeStage.name}</p>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* Dialog para criar nova etapa */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Etapa</DialogTitle>
            <DialogDescription>
              Adicione uma nova etapa ao fluxo de trabalho do projeto
            </DialogDescription>
          </DialogHeader>
          <StageForm
            projectId={projectId}
            onSuccess={() => {
              setIsCreateOpen(false)
              fetchStages()
            }}
            onCancel={() => setIsCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog para editar etapa */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Etapa</DialogTitle>
            <DialogDescription>
              Atualize as informações da etapa
            </DialogDescription>
          </DialogHeader>
          {selectedStage && (
            <StageForm
              projectId={projectId}
              initialData={selectedStage}
              onSuccess={() => {
                setIsEditOpen(false)
                setSelectedStage(null)
                fetchStages()
              }}
              onCancel={() => {
                setIsEditOpen(false)
                setSelectedStage(null)
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
              Tem certeza que deseja excluir a etapa &quot;{selectedStage?.name}&quot;?
              {selectedStage?.tasks && selectedStage.tasks.length > 0 && (
                <span className="block mt-2 text-destructive font-semibold">
                  Esta etapa possui {selectedStage.tasks.length} tarefa(s). 
                  Você precisa mover ou excluir todas as tarefas antes de excluir esta etapa.
                </span>
              )}
              {(!selectedStage?.tasks || selectedStage.tasks.length === 0) && (
                <span className="block mt-2">
                  Esta ação não pode ser desfeita.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={selectedStage?.tasks && selectedStage.tasks.length > 0}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

