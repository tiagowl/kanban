'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Tarefa } from '@/lib/types'
import { useState } from 'react'
import { TaskModal } from '@/components/tasks/task-modal'

interface TaskCardProps {
  task: Tarefa
}

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  }

  const completedSubtasks = task.subtarefas?.filter((st) => st.concluida).length || 0
  const totalSubtasks = task.subtarefas?.length || 0
  const hasSubtasks = totalSubtasks > 0

  const formatUpdateTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Atualizado agora'
    if (diffMins < 60) return `Atualizado há ${diffMins}min`
    if (diffHours < 24) return `Atualizado há ${diffHours}h`
    if (diffDays < 7) return `Atualizado há ${diffDays}d`
    return `Atualizado em ${date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`
          bg-white rounded-lg p-4 shadow cursor-grab active:cursor-grabbing
          hover:shadow-md transition-shadow duration-150
          ${isDragging ? 'scale-105 shadow-lg z-50' : ''}
        `}
      >
        <div onClick={(e) => {
          // Só abre modal se não estiver arrastando
          if (!isDragging) {
            setIsModalOpen(true)
          }
        }}>
          <h4 className="font-medium text-gray-900 mb-1">{task.titulo}</h4>
          
          {/* Data de última atualização */}
          <div className="text-xs text-gray-400 mb-2">
            {formatUpdateTime(task.atualizado_em)}
          </div>
          
          {task.descricao && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {task.descricao}
            </p>
          )}

          {hasSubtasks && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>{completedSubtasks}/{totalSubtasks}</span>
                </div>
                <span className="font-medium">{Math.round((completedSubtasks / totalSubtasks) * 100)}%</span>
              </div>
              {/* Barra de progresso */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-300 rounded-full"
                  style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={completedSubtasks}
                  aria-valuemin={0}
                  aria-valuemax={totalSubtasks}
                  aria-label={`${completedSubtasks} de ${totalSubtasks} subtarefas concluídas`}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
          taskId={task.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

