'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { Task } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

interface TaskFormProps {
  stageId: string
  onSuccess?: (task: Task) => void
  onCancel?: () => void
  initialData?: {
    title?: string
    description?: string
  }
}

export function TaskForm({ stageId, onSuccess, onCancel, initialData }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const task = await api.post<Task>('/tasks', {
        title,
        description: description || undefined,
        stageId,
      })
      toast({
        title: 'Sucesso',
        description: 'Tarefa criada com sucesso!',
      })
      onSuccess?.(task)
      setTitle('')
      setDescription('')
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar a tarefa',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título da Tarefa *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da tarefa"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição da tarefa..."
          rows={4}
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Criar'}
        </Button>
      </div>
    </form>
  )
}






