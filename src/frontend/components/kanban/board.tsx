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
  projectName?: string
}

export function Board({ projectId, projectName }: BoardProps) {
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
      <div className="max-w-md mx-auto">
        <div className="text-center py-12 px-6 bg-white rounded-xl shadow-sm border border-red-100">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar</h3>
          <p className="text-error-500 mb-6 text-sm">{error}</p>
          <button
            onClick={loadBoard}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors shadow-sm hover:shadow"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  // Calcular estatísticas
  const totalTasks = tasks.length
  const tasksByStage = stages.map(stage => ({
    stage,
    count: tasks.filter(t => t.etapa_id === stage.id).length
  }))
  const completedTasks = tasks.filter(t => {
    const subtasks = t.subtarefas || []
    return subtasks.length > 0 && subtasks.every(st => st.concluida)
  }).length

  if (stages.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-16 px-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 mb-6">
            <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Nenhuma etapa criada ainda
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Crie sua primeira etapa para começar a organizar suas tarefas e dar início ao projeto
          </p>
          <button
            onClick={() => {/* Abrir modal criar etapa */}}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Criar Primeira Etapa
          </button>
        </div>
      </div>
    )
  }

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null

  return (
    <div className="space-y-6">
      {/* Estatísticas do Projeto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total de Tarefas</p>
              <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Etapas Ativas</p>
              <p className="text-3xl font-bold text-gray-900">{stages.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Tarefas Concluídas</p>
              <p className="text-3xl font-bold text-gray-900">{completedTasks}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Board Kanban */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-6 px-2 -mx-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
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
            <div className="bg-white rounded-xl p-4 shadow-2xl opacity-95 rotate-2 scale-105 w-80 border-2 border-primary-200">
              <h4 className="font-semibold text-gray-900 mb-1">{activeTask.titulo}</h4>
              {activeTask.descricao && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {activeTask.descricao}
                </p>
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

