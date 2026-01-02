'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api/client'
import type { CreateTarefaInput } from '@/lib/types'

interface TaskFormProps {
  etapaId: string
  projetoId: string
  onSuccess?: () => void
  onCancel?: () => void
  initialData?: { titulo?: string; descricao?: string }
}

export function TaskForm({ etapaId, projetoId, onSuccess, onCancel, initialData }: TaskFormProps) {
  const [formData, setFormData] = useState<CreateTarefaInput>({
    etapa_id: etapaId,
    projeto_id: projetoId,
    titulo: initialData?.titulo || '',
    descricao: initialData?.descricao || '',
  })
  const [errors, setErrors] = useState<{ titulo?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!formData.titulo.trim()) {
      setErrors({ titulo: 'Título é obrigatório' })
      return
    }

    try {
      setIsLoading(true)
      const response = await api.post('/tasks', formData)

      if (response.success) {
        setFormData({ ...formData, titulo: '', descricao: '' })
        onSuccess?.()
      } else {
        setErrors({ titulo: response.error?.message || 'Erro ao criar tarefa' })
      }
    } catch (error) {
      setErrors({ titulo: 'Erro ao criar tarefa' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        value={formData.titulo}
        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
        placeholder="Digite o título da tarefa..."
        error={errors.titulo}
        required
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
          if (e.key === 'Escape') {
            onCancel?.()
          }
        }}
      />

      <Textarea
        value={formData.descricao}
        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
        placeholder="Descrição (opcional)"
        rows={2}
      />

      <div className="flex gap-2">
        <Button type="submit" size="small" isLoading={isLoading}>
          Criar
        </Button>
        {onCancel && (
          <Button type="button" variant="text" size="small" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}

