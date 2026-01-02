'use client'

import { useState } from 'react'
import { api } from '@/lib/api/client'
import type { Subtarefa, CreateSubtarefaInput } from '@/lib/types'
import { SubtaskItem } from './subtask-item'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SubtaskListProps {
  taskId: string
  subtasks: Subtarefa[]
}

export function SubtaskList({ taskId, subtasks: initialSubtasks }: SubtaskListProps) {
  const [subtasks, setSubtasks] = useState(initialSubtasks)
  const [isAdding, setIsAdding] = useState(false)
  const [newSubtaskName, setNewSubtaskName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async () => {
    if (!newSubtaskName.trim()) return

    try {
      setIsLoading(true)
      const response = await api.post<Subtarefa>('/subtasks', {
        tarefa_id: taskId,
        nome: newSubtaskName,
      } as CreateSubtarefaInput)

      if (response.success && response.data) {
        setSubtasks([...subtasks, response.data])
        setNewSubtaskName('')
        setIsAdding(false)
      }
    } catch (error) {
      console.error('Erro ao criar subtarefa:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = async (subtaskId: string, currentStatus: boolean) => {
    // Optimistic update
    setSubtasks(subtasks.map((st) =>
      st.id === subtaskId ? { ...st, concluida: !currentStatus } : st
    ))

    const response = await api.patch(`/subtasks/${subtaskId}/toggle`, {
      concluida: !currentStatus,
    })

    if (!response.success) {
      // Reverter em caso de erro
      setSubtasks(subtasks)
    }
  }

  const handleDelete = async (subtaskId: string) => {
    const response = await api.delete(`/subtasks/${subtaskId}`)
    if (response.success) {
      setSubtasks(subtasks.filter((st) => st.id !== subtaskId))
    }
  }

  const handleUpdate = async (subtaskId: string, newName: string) => {
    const response = await api.put(`/subtasks/${subtaskId}`, { nome: newName })
    if (response.success && response.data) {
      setSubtasks(subtasks.map((st) =>
        st.id === subtaskId ? response.data! : st
      ))
    }
  }

  const completedCount = subtasks.filter((st) => st.concluida).length
  const totalCount = subtasks.length

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">
          Subtarefas ({completedCount}/{totalCount} concluídas)
        </h4>
      </div>

      <div className="space-y-2 mb-3">
        {subtasks.map((subtask) => (
          <SubtaskItem
            key={subtask.id}
            subtask={subtask}
            onToggle={() => handleToggle(subtask.id, subtask.concluida)}
            onDelete={() => handleDelete(subtask.id)}
            onUpdate={(name) => handleUpdate(subtask.id, name)}
          />
        ))}
      </div>

      {isAdding ? (
        <div className="flex gap-2">
          <Input
            value={newSubtaskName}
            onChange={(e) => setNewSubtaskName(e.target.value)}
            placeholder="Nome da subtarefa..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd()
              } else if (e.key === 'Escape') {
                setIsAdding(false)
                setNewSubtaskName('')
              }
            }}
            autoFocus
          />
          <Button size="small" onClick={handleAdd} isLoading={isLoading}>
            Adicionar
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              setIsAdding(false)
              setNewSubtaskName('')
            }}
          >
            Cancelar
          </Button>
        </div>
      ) : (
        <Button
          variant="text"
          size="small"
          onClick={() => setIsAdding(true)}
        >
          + Adicionar Subtarefa
        </Button>
      )}
    </div>
  )
}

