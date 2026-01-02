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
          bg-white rounded-xl p-4 shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing
          hover:shadow-lg hover:border-gray-300 transition-all duration-200
          ${isDragging ? 'scale-105 shadow-xl border-primary-300 z-50 rotate-2' : ''}
        `}
      >
        <div 
          onClick={(e) => {
            // Só abre modal se não estiver arrastando
            if (!isDragging) {
              setIsModalOpen(true)
            }
          }}
          className="cursor-pointer"
        >
          <h4 className="font-semibold text-gray-900 mb-1.5 text-[15px] leading-snug line-clamp-2">
            {task.titulo}
          </h4>
          
          {/* Data de última atualização */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatUpdateTime(task.atualizado_em)}</span>
          </div>
          
          {task.descricao && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
              {task.descricao}
            </p>
          )}

          {hasSubtasks && (
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span className="font-medium">{completedSubtasks}/{totalSubtasks}</span>
                </div>
                <span className="font-semibold text-primary-600">{Math.round((completedSubtasks / totalSubtasks) * 100)}%</span>
              </div>
              {/* Barra de progresso */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 rounded-full shadow-sm"
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

