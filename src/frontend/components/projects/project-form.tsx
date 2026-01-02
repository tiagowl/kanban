'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api/client'
import type { CreateProjetoInput, Projeto } from '@/lib/types'

interface ProjectFormProps {
  onSuccess?: (project: Projeto) => void
  onCancel?: () => void
  initialData?: { nome?: string; descricao?: string }
}

export function ProjectForm({ onSuccess, onCancel, initialData }: ProjectFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<CreateProjetoInput>({
    nome: initialData?.nome || '',
    descricao: initialData?.descricao || '',
  })
  const [errors, setErrors] = useState<{ nome?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!formData.nome.trim()) {
      setErrors({ nome: 'Nome é obrigatório' })
      return
    }

    try {
      setIsLoading(true)
      const response = await api.post<Projeto>('/projects', formData)

      if (response.success && response.data) {
        if (onSuccess) {
          onSuccess(response.data)
        } else {
          router.push(`/dashboard/projects/${response.data.id}`)
        }
      } else {
        setErrors({ nome: response.error?.message || 'Erro ao criar projeto' })
      }
    } catch (error) {
      setErrors({ nome: 'Erro ao criar projeto' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome do Projeto"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        error={errors.nome}
        required
        placeholder="Ex: Projeto de Desenvolvimento"
        autoFocus
      />

      <Textarea
        label="Descrição"
        value={formData.descricao}
        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
        placeholder="Descrição opcional do projeto..."
        rows={3}
      />

      <div className="flex gap-3 justify-end pt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" isLoading={isLoading}>
          Criar Projeto
        </Button>
      </div>
    </form>
  )
}

