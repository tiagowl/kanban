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
        flex-shrink-0 w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-5
        ${isOver ? 'ring-2 ring-primary-500 ring-offset-2 bg-gradient-to-br from-primary-50/50 to-white shadow-lg scale-[1.02]' : 'hover:shadow-md'}
        transition-all duration-300
        flex flex-col
        h-fit max-h-[calc(100vh-180px)]
      `}
    >
      {/* Header da Coluna */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary-500"></div>
          <h3 className="font-bold text-gray-900 text-base">
            {stage.nome}
          </h3>
        </div>
        <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Lista de Tarefas com Botão */}
      <div className="min-h-[500px] flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1">
        <div className="space-y-3 pb-3">
          {tasks.length > 0 ? (
            <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
          ) : (
            !isCreatingTask && (
              <div className={`min-h-[400px] flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed rounded-xl transition-all duration-300 ${
                isOver 
                  ? 'border-primary-400 bg-gradient-to-br from-primary-50/80 to-primary-100/50 text-primary-700 shadow-inner' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                {isOver ? (
                  <>
                    <svg className="w-8 h-8 mb-2 text-primary-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="font-medium">Solte aqui para mover</span>
                  </>
                ) : (
                  <>
                    <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span>Nenhuma tarefa ainda</span>
                  </>
                )}
              </div>
            )
          )}

          {/* Botão Adicionar Tarefa dentro da área de scroll */}
          <div className="mt-3">
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
                className="w-full py-2.5 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group border border-gray-200 hover:border-gray-300"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Adicionar Tarefa</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

