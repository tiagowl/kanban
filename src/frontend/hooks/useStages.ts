'use client'

import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import { Stage, CreateStageInput, UpdateStageInput } from '@/types'
import { useToast } from '@/components/ui/use-toast'

export function useStages(projectId?: string) {
  const [stages, setStages] = useState<Stage[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchStages = useCallback(async () => {
    if (!projectId) {
      setStages([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const data = await api.get<Stage[]>(`/projects/${projectId}/stages`)
      setStages(data)
    } catch (error) {
      console.error('Error fetching stages:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as etapas.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [projectId, toast])

  useEffect(() => {
    fetchStages()
  }, [fetchStages])

  const createStage = useCallback(async (input: CreateStageInput) => {
    try {
      const newStage = await api.post<Stage>(`/projects/${input.projectId}/stages`, input)
      setStages((prev) => [...prev, newStage])
      toast({
        title: 'Sucesso',
        description: 'Etapa criada com sucesso!',
      })
      return newStage
    } catch (error) {
      console.error('Error creating stage:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível criar a etapa.',
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  const updateStage = useCallback(async (stageId: string, input: UpdateStageInput, skipToast = false) => {
    try {
      const updatedStage = await api.patch<Stage>(`/stages/${stageId}`, input)
      
      // Se for uma mudança de ordem, recarregar todas as etapas
      if (input.order !== undefined) {
        // Não atualizar localmente, deixar o fetchStages fazer isso
        if (!skipToast) {
          toast({
            title: 'Sucesso',
            description: 'Etapa atualizada com sucesso!',
          })
        }
        return updatedStage
      }
      
      setStages((prev) => prev.map((s) => (s.id === stageId ? updatedStage : s)))
      if (!skipToast) {
        toast({
          title: 'Sucesso',
          description: 'Etapa atualizada com sucesso!',
        })
      }
      return updatedStage
    } catch (error) {
      console.error('Error updating stage:', error)
      if (!skipToast) {
        toast({
          title: 'Erro',
          description: 'Não foi possível atualizar a etapa.',
          variant: 'destructive',
        })
      }
      throw error
    }
  }, [toast])

  const deleteStage = useCallback(async (stageId: string) => {
    try {
      await api.delete(`/stages/${stageId}`)
      setStages((prev) => prev.filter((s) => s.id !== stageId))
      toast({
        title: 'Sucesso',
        description: 'Etapa excluída com sucesso!',
      })
    } catch (error: any) {
      console.error('Error deleting stage:', error)
      const errorMessage = error?.message || 'Não foi possível excluir a etapa.'
      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  return {
    stages,
    loading,
    fetchStages,
    createStage,
    updateStage,
    deleteStage,
  }
}

