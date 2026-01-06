'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Stage, Task } from '@/types'
import { KanbanColumn } from './KanbanColumn'
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useToast } from '@/components/ui/use-toast'
import { Task } from '@/types'

interface KanbanBoardProps {
  projectId: string
}

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [stages, setStages] = useState<Stage[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  useEffect(() => {
    async function fetchData() {
      try {
        const [stagesData, tasksData] = await Promise.all([
          api.get<Stage[]>(`/projects/${projectId}/stages`),
          api.get<Task[]>(`/tasks?projectId=${projectId}`),
        ])
        setStages(stagesData)
        setTasks(tasksData)
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [projectId, toast])

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string
    setActiveId(taskId)
    const task = tasks.find((t) => t.id === taskId)
    setActiveTask(task || null)
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Isso ajuda a melhorar o feedback durante o drag
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null)
    setActiveTask(null)
    const { active, over } = event

    if (!over) {
      return
    }

    const taskId = active.id as string
    const overId = over.id as string

    // Verificar se está sobre uma etapa
    let targetStage = stages.find((s) => s.id === overId)
    
    // Se não encontrou diretamente, pode ser que o over seja uma task
    // Nesse caso, vamos procurar qual stage contém essa task
    if (!targetStage) {
      const overTask = tasks.find((t) => t.id === overId)
      if (overTask) {
        targetStage = stages.find((s) => s.id === overTask.stageId)
      }
    }

    // Se ainda não encontrou, tentar pelo data do droppable
    if (!targetStage && over.data.current) {
      const stageData = over.data.current as { type?: string; stage?: Stage }
      if (stageData.type === 'stage' && stageData.stage) {
        targetStage = stageData.stage
      }
    }

    if (!targetStage) {
      return
    }

    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    
    // Se já está na mesma etapa, não faz nada
    if (task.stageId === targetStage.id) {
      return
    }

    // Optimistic update
    const previousTasks = [...tasks]
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, stageId: targetStage!.id } : t
      )
    )

    try {
      await api.post(`/tasks/${taskId}/move`, {
        stageId: targetStage.id,
      })
      toast({
        title: 'Sucesso',
        description: 'Tarefa movida com sucesso!',
      })
      // Recarregar dados para garantir sincronização
      const tasksData = await api.get<Task[]>(`/tasks?projectId=${projectId}`)
      setTasks(tasksData)
    } catch (error) {
      // Reverter optimistic update
      setTasks(previousTasks)
      toast({
        title: 'Erro',
        description: 'Não foi possível mover a tarefa',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        <SortableContext
          items={stages.map((s) => s.id)}
          strategy={horizontalListSortingStrategy}
        >
          {stages.map((stage) => {
            const stageTasks = tasks.filter((t) => t.stageId === stage.id)
            return (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                tasks={stageTasks}
                projectId={projectId}
                activeTaskId={activeId}
                onTaskCreated={(task) => setTasks((prev) => [...prev, task])}
                onTaskDeleted={(taskId) =>
                  setTasks((prev) => prev.filter((t) => t.id !== taskId))
                }
              />
            )
          })}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 opacity-90">
            <TaskCardPreview task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// Componente para preview durante o drag
function TaskCardPreview({ task }: { task: Task }) {
  const completedSubtasks = task.subtasks?.filter((st) => st.completed).length || 0
  const totalSubtasks = task.subtasks?.length || 0

  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-4 w-80">
      <h3 className="font-semibold mb-2">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {task.description}
        </p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        {task.labels?.map((taskLabel) => (
          <span
            key={taskLabel.id}
            className="px-2 py-0.5 rounded-full text-xs border"
            style={{ backgroundColor: taskLabel.label?.color + '20', color: taskLabel.label?.color }}
          >
            {taskLabel.label?.name}
          </span>
        ))}
        {totalSubtasks > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {completedSubtasks}/{totalSubtasks}
          </div>
        )}
      </div>
    </div>
  )
}

