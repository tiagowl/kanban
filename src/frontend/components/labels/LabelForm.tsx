'use client'

import { useState } from 'react'
import { Label, CreateLabelInput, UpdateLabelInput } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label as LabelComponent } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

interface LabelFormProps {
  projectId: string
  onSuccess?: (label: Label) => void
  onCancel?: () => void
  initialData?: Partial<Label>
}

export function LabelForm({ projectId, onSuccess, onCancel, initialData }: LabelFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [color, setColor] = useState(initialData?.color || '#3b82f6')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const input: CreateLabelInput | UpdateLabelInput = {
        name,
        color,
        projectId,
      }

      const api = (await import('@/lib/api')).api
      
      if (initialData?.id) {
        const updated = await api.patch<Label>(`/labels/${initialData.id}`, input)
        toast({
          title: 'Sucesso',
          description: 'Etiqueta atualizada com sucesso!',
        })
        onSuccess?.(updated)
      } else {
        const created = await api.post<Label>('/labels', input)
        toast({
          title: 'Sucesso',
          description: 'Etiqueta criada com sucesso!',
        })
        onSuccess?.(created)
      }
      
      setName('')
      setColor('#3b82f6')
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error?.message || 'Não foi possível salvar a etiqueta',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <LabelComponent htmlFor="name">Nome da Etiqueta *</LabelComponent>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Urgente, Frontend, etc."
          required
        />
      </div>
      <div className="space-y-2">
        <LabelComponent htmlFor="color">Cor *</LabelComponent>
        <div className="flex items-center gap-3">
          <Input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-20 h-10 cursor-pointer"
            required
          />
          <Input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#3b82f6"
            pattern="^#[0-9A-Fa-f]{6}$"
            className="flex-1"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Escolha uma cor ou digite o código hexadecimal
        </p>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : initialData?.id ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  )
}


