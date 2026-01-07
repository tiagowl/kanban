'use client'

import { useState, useEffect } from 'react'
import { Stage, CreateStageInput, UpdateStageInput } from '@/types'
import { Input } from '@/components/ui/input'
import { Label as LabelComponent } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useStages } from '@/hooks/useStages'
import { useToast } from '@/components/ui/use-toast'

interface StageFormProps {
  projectId: string
  initialData?: Stage
  onSuccess: (stage: Stage) => void
  onCancel: () => void
}

export function StageForm({ projectId, initialData, onSuccess, onCancel }: StageFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [loading, setLoading] = useState(false)
  const { createStage, updateStage } = useStages(projectId)
  const { toast } = useToast()

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      let resultStage: Stage
      if (initialData) {
        const updateData: UpdateStageInput = { name }
        resultStage = await updateStage(initialData.id, updateData)
      } else {
        const createData: CreateStageInput = { name, projectId }
        resultStage = await createStage(createData)
      }
      onSuccess(resultStage)
    } catch (error) {
      console.error('Error saving stage:', error)
      toast({
        title: 'Erro',
        description: `Não foi possível ${initialData ? 'atualizar' : 'criar'} a etapa.`,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <LabelComponent htmlFor="name">Nome da Etapa</LabelComponent>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: To Do, Em Progresso, Concluído"
          required
          maxLength={50}
        />
        <p className="text-xs text-muted-foreground">
          {name.length}/50 caracteres
        </p>
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="w-full sm:w-auto">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading || !name.trim()} className="w-full sm:w-auto">
          {loading ? 'Salvando...' : initialData ? 'Salvar Alterações' : 'Criar Etapa'}
        </Button>
      </div>
    </form>
  )
}


