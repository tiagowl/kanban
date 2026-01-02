'use client'

import { useEffect, useState } from 'react'
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors, closestCenter, DragOverlay } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { api } from '@/lib/api/client'
import type { Etapa, Tarefa } from '@/lib/types'
import { Column } from './column'
import { Loading } from '@/components/shared/loading'
import { TaskCard } from './task-card'

interface BoardProps {
  projectId: string
}

export function Board({ projectId }: BoardProps) {
  const [stages, setStages] = useState<Etapa[]>([])
  const [tasks, setTasks] = useState<Tarefa[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    loadBoard()
  }, [projectId])

  const loadBoard = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Carregar etapas
      const stagesResponse = await api.get<Etapa[]>(`/projects/${projectId}/stages`)
      if (!stagesResponse.success || !stagesResponse.data) {
        throw new Error(stagesResponse.error?.message || 'Erro ao carregar etapas')
      }

      // Carregar tarefas
      const tasksResponse = await api.get<Tarefa[]>(`/tasks?projeto_id=${projectId}`)
      if (!tasksResponse.success || !tasksResponse.data) {
        throw new Error(tasksResponse.error?.message || 'Erro ao carregar tarefas')
      }

      setStages(stagesResponse.data.sort((a, b) => a.ordem - b.ordem))
      setTasks(tasksResponse.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar board')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Lógica de feedback visual durante drag
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const taskId = active.id as string
    const overId = over.id as string

    const currentTask = tasks.find((t) => t.id === taskId)
    if (!currentTask) return

    // Verificar se é uma coluna (etapa) - IDs das etapas
    const targetStage = stages.find((s) => s.id === overId)
    
    if (targetStage) {
      if (currentTask.etapa_id === targetStage.id) {
        // Mesma etapa, não fazer nada
        return
      }
      
      // Movendo para outra etapa (última posição)
      const targetStageTasks = tasks.filter((t) => t.etapa_id === targetStage.id && t.id !== taskId).sort((a, b) => a.ordem - b.ordem)
      const maxOrder = targetStageTasks.length > 0 
        ? Math.max(...targetStageTasks.map(t => t.ordem))
        : -1
      const newOrder = maxOrder + 1
      
      await moveTaskToStage(taskId, targetStage.id, newOrder)
      return
    }

    // Verificar se é outra tarefa
    const targetTask = tasks.find((t) => t.id === overId)
    if (targetTask) {
      if (currentTask.etapa_id === targetTask.etapa_id) {
        // Reordenar na mesma etapa
        const stageTasks = tasks.filter((t) => t.etapa_id === targetTask.etapa_id).sort((a, b) => a.ordem - b.ordem)
        const currentIndex = stageTasks.findIndex((t) => t.id === taskId)
        const targetIndex = stageTasks.findIndex((t) => t.id === targetTask.id)
        
        if (currentIndex === targetIndex || currentIndex === -1 || targetIndex === -1) {
          return
        }
        
        await reorderTaskInSameStage(taskId, targetIndex, targetTask.etapa_id)
      } else {
        // Movendo para outra etapa em posição específica
        const targetStageTasks = tasks.filter((t) => t.etapa_id === targetTask.etapa_id && t.id !== taskId).sort((a, b) => a.ordem - b.ordem)
        const targetIndex = targetStageTasks.findIndex((t) => t.id === targetTask.id)
        const newOrder = targetIndex >= 0 ? targetTask.ordem : targetStageTasks.length
        await moveTaskToStage(taskId, targetTask.etapa_id, newOrder)
      }
      return
    }
  }

  const moveTaskToStage = async (taskId: string, newStageId: string, newOrder: number) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    // Se está na mesma etapa, não fazer nada
    if (task.etapa_id === newStageId && task.ordem === newOrder) return

    // Optimistic update
    const oldTasks = [...tasks]
    const updatedTasks = tasks
      .filter((t) => t.id !== taskId)
      .map((t) => {
        // Ajustar ordens na etapa origem (se mudou de etapa)
        if (task.etapa_id !== newStageId && t.etapa_id === task.etapa_id && t.ordem > task.ordem) {
          return { ...t, ordem: t.ordem - 1 }
        }
        // Ajustar ordens na etapa destino
        if (t.etapa_id === newStageId && t.ordem >= newOrder) {
          return { ...t, ordem: t.ordem + 1 }
        }
        return t
      })
    
    const movedTask = { ...task, etapa_id: newStageId, ordem: newOrder }
    updatedTasks.push(movedTask)
    setTasks(updatedTasks)

    try {
      // API call
      const response = await api.patch(`/tasks/${taskId}/move`, {
        nova_etapa_id: newStageId,
        nova_ordem: newOrder,
      })

      if (!response.success) {
        // Reverter em caso de erro
        setTasks(oldTasks)
        console.error('Erro ao mover tarefa:', response.error?.message)
        alert(`Erro ao mover tarefa: ${response.error?.message}`)
      } else {
        // Recarregar para garantir sincronização
        await loadBoard()
      }
    } catch (error) {
      // Reverter em caso de erro
      setTasks(oldTasks)
      console.error('Erro ao mover tarefa:', error)
      alert(`Erro ao mover tarefa: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  const reorderTaskInSameStage = async (taskId: string, targetIndex: number, stageId: string) => {
    const stageTasks = tasks
      .filter((t) => t.etapa_id === stageId)
      .sort((a, b) => a.ordem - b.ordem)

    const currentIndex = stageTasks.findIndex((t) => t.id === taskId)

    if (currentIndex === -1 || targetIndex === -1 || currentIndex === targetIndex) return

    // Optimistic update usando arrayMove logic
    const oldTasks = [...tasks]
    const reorderedStageTasks = arrayMove(stageTasks, currentIndex, targetIndex)
    
    // Atualizar ordens baseado na nova posição
    const updatedStageTasks = reorderedStageTasks.map((t, index) => ({
      ...t,
      ordem: index
    }))

    // Atualizar todas as tarefas
    const updatedTasks = tasks.map((t) => {
      const updated = updatedStageTasks.find((st) => st.id === t.id)
      return updated || t
    })

    setTasks(updatedTasks)

    try {
      // API call - não enviar nova_etapa_id se for a mesma etapa
      const response = await api.patch(`/tasks/${taskId}/move`, {
        nova_ordem: targetIndex,
      })

      if (!response.success) {
        // Reverter em caso de erro
        setTasks(oldTasks)
        console.error('Erro ao reordenar tarefa:', response.error?.message)
        alert(`Erro ao reordenar tarefa: ${response.error?.message}`)
      } else {
        // Recarregar para garantir sincronização
        await loadBoard()
      }
    } catch (error) {
      // Reverter em caso de erro
      setTasks(oldTasks)
      console.error('Erro ao reordenar tarefa:', error)
      alert(`Erro ao reordenar tarefa: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
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
          onClick={loadBoard}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (stages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhuma etapa criada ainda
        </h2>
        <p className="text-gray-600 mb-4">
          Crie sua primeira etapa para começar a organizar
        </p>
        <button
          onClick={() => {/* Abrir modal criar etapa */}}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Criar Primeira Etapa
        </button>
      </div>
    )
  }

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-6 px-2">
        {stages.map((stage) => {
          const stageTasks = tasks
            .filter((t) => t.etapa_id === stage.id)
            .sort((a, b) => a.ordem - b.ordem)

          return (
            <Column
              key={stage.id}
              stage={stage}
              tasks={stageTasks}
              projectId={projectId}
              onTaskCreate={() => loadBoard()}
            />
          )
        })}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="bg-white rounded-lg p-4 shadow-lg opacity-90 rotate-3 scale-105 w-80">
            <h4 className="font-medium text-gray-900">{activeTask.titulo}</h4>
            {activeTask.descricao && (
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {activeTask.descricao}
              </p>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

