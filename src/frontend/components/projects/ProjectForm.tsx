'use client'

import { useState, useEffect } from 'react'
import { useProjects } from '@/hooks/useProjects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ProjectFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  initialData?: {
    id?: string
    name?: string
    description?: string
  }
}

export function ProjectForm({ onSuccess, onCancel, initialData }: ProjectFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [loading, setLoading] = useState(false)
  const { createProject, updateProject } = useProjects()
  const isEditing = !!initialData?.id

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setDescription(initialData.description || '')
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isEditing && initialData?.id) {
        await updateProject(initialData.id, {
          name,
          description: description || undefined,
        })
      } else {
        await createProject({ name, description: description || undefined })
      }
      onSuccess?.()
      if (!isEditing) {
        setName('')
        setDescription('')
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} project:`, error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Projeto *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Meu Projeto"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição do projeto..."
          rows={3}
        />
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={loading || !name.trim()} className="w-full sm:w-auto">
          {loading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar'}
        </Button>
      </div>
    </form>
  )
}


