'use client'

import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SubtaskList } from './subtask-list'
import { api } from '@/lib/api/client'
import type { Tarefa, Etapa } from '@/lib/types'

interface TaskModalProps {
  taskId: string
  isOpen: boolean
  onClose: () => void
}

export function TaskModal({ taskId, isOpen, onClose }: TaskModalProps) {
  const [task, setTask] = useState<Tarefa | null>(null)
  const [stages, setStages] = useState<Etapa[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ titulo: '', descricao: '', etapa_id: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen && taskId) {
      loadTask()
    }
  }, [isOpen, taskId])

  // Carregar stages quando task for carregada
  useEffect(() => {
    if (task?.projeto_id) {
      loadStages()
    }
  }, [task?.projeto_id])

  const loadStages = async () => {
    if (!task?.projeto_id) return
    try {
      const stagesResponse = await api.get<Etapa[]>(`/projects/${task.projeto_id}/stages`)
      if (stagesResponse.success && stagesResponse.data) {
        setStages(stagesResponse.data)
      }
    } catch (error) {
      console.error('Erro ao carregar etapas:', error)
    }
  }

  const loadTask = async () => {
    try {
      setIsLoading(true)
      const taskResponse = await api.get<Tarefa>(`/tasks/${taskId}`)

      if (taskResponse.success && taskResponse.data) {
        setTask(taskResponse.data)
        setFormData({
          titulo: taskResponse.data.titulo,
          descricao: taskResponse.data.descricao || '',
          etapa_id: taskResponse.data.etapa_id,
        })
      }
    } catch (error) {
      console.error('Erro ao carregar tarefa:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!task) return

    try {
      setIsSaving(true)
      const response = await api.put(`/tasks/${task.id}`, {
        titulo: formData.titulo,
        descricao: formData.descricao,
        etapa_id: formData.etapa_id,
      })

      if (response.success && response.data) {
        setTask(response.data)
        setIsEditing(false)
        onClose()
      }
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!task || !confirm('Tem certeza que deseja excluir esta tarefa?')) return

    try {
      const response = await api.delete(`/tasks/${task.id}`)
      if (response.success) {
        onClose()
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error)
    }
  }

  if (isLoading || !task) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Carregando...">
        <div className="py-8 text-center">Carregando...</div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalhes da Tarefa" size="large">
      <div className="space-y-6">
        {/* Título */}
        <div>
          {isEditing ? (
            <Input
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              label="Título"
              required
            />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{task.titulo}</h3>
                <Button variant="text" size="small" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Etapa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Etapa
          </label>
          {isEditing ? (
            <select
              value={formData.etapa_id}
              onChange={(e) => setFormData({ ...formData, etapa_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.nome}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-700">{stages.find((s) => s.id === task.etapa_id)?.nome || 'N/A'}</p>
          )}
        </div>

        {/* Descrição */}
        <div>
          {isEditing ? (
            <Textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              label="Descrição"
            />
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <p className="text-gray-700 whitespace-pre-wrap">
                {task.descricao || 'Sem descrição'}
              </p>
            </div>
          )}
        </div>

        {/* Subtarefas */}
        <div>
          <SubtaskList taskId={task.id} subtasks={task.subtarefas || []} />
        </div>

        {/* Ações */}
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} isLoading={isSaving}>
                Salvar
              </Button>
            </>
          ) : (
            <>
              <Button variant="text" onClick={handleDelete}>
                Excluir
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

