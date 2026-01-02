'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Etapa, Tarefa } from '@/lib/types'
import { TaskCard } from './task-card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { TaskForm } from '@/components/tasks/task-form'
import { Modal } from '@/components/ui/modal'

interface ColumnProps {
  stage: Etapa
  tasks: Tarefa[]
  projectId: string
  onTaskCreate?: () => void
}

export function Column({ stage, tasks, projectId, onTaskCreate }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  })

  const [isCreatingTask, setIsCreatingTask] = useState(false)

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4
        ${isOver ? 'ring-2 ring-primary-500 ring-offset-2 bg-primary-50' : ''}
        transition-all duration-200
        flex flex-col
      `}
    >
      {/* Header da Coluna */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          {stage.nome}
        </h3>
        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Lista de Tarefas */}
      <div className="space-y-3 min-h-[200px] flex-1">
        {tasks.length > 0 ? (
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        ) : (
          <div className={`h-32 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed rounded-md transition-colors ${
            isOver 
              ? 'border-primary-500 bg-primary-50 text-primary-700' 
              : 'border-gray-300'
          }`}>
            {isOver ? 'Solte aqui para mover' : 'Nenhuma tarefa'}
          </div>
        )}
      </div>

      {/* Botão Adicionar Tarefa */}
      <div className="mt-4">
        {isCreatingTask ? (
          <TaskForm
            etapaId={stage.id}
            projetoId={projectId}
            onSuccess={() => {
              setIsCreatingTask(false)
              onTaskCreate?.()
            }}
            onCancel={() => setIsCreatingTask(false)}
          />
        ) : (
          <button
            onClick={() => setIsCreatingTask(true)}
            className="w-full py-2 px-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Adicionar Tarefa
          </button>
        )}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && !isCreatingTask && (
        <div className="text-center py-8 text-gray-500 text-sm">
          Nenhuma tarefa
        </div>
      )}
    </div>
  )
}

