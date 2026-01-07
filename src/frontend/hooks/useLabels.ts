'use client'

import { useState, useEffect, useCallback } from 'react'
import { api, ApiError } from '@/lib/api'
import { Label, CreateLabelInput, UpdateLabelInput } from '@/types'
import { useToast } from '@/components/ui/use-toast'

export function useLabels(projectId?: string) {
  const [labels, setLabels] = useState<Label[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchLabels = useCallback(async () => {
    if (!projectId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await api.get<Label[]>(`/labels?projectId=${projectId}`)
      setLabels(data)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch labels')
      setError(error)
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [projectId, toast])

  useEffect(() => {
    fetchLabels()
  }, [fetchLabels])

  const createLabel = useCallback(async (input: CreateLabelInput) => {
    try {
      const newLabel = await api.post<Label>('/labels', input)
      setLabels((prev) => [...prev, newLabel])
      toast({
        title: 'Sucesso',
        description: 'Etiqueta criada com sucesso!',
      })
      return newLabel
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create label')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  const updateLabel = useCallback(async (id: string, input: UpdateLabelInput) => {
    try {
      const updated = await api.patch<Label>(`/labels/${id}`, input)
      setLabels((prev) => prev.map((l) => (l.id === id ? updated : l)))
      toast({
        title: 'Sucesso',
        description: 'Etiqueta atualizada com sucesso!',
      })
      return updated
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update label')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  const deleteLabel = useCallback(async (id: string) => {
    try {
      await api.delete(`/labels/${id}`)
      setLabels((prev) => prev.filter((l) => l.id !== id))
      toast({
        title: 'Sucesso',
        description: 'Etiqueta excluída com sucesso!',
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete label')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  return {
    labels,
    loading,
    error,
    createLabel,
    updateLabel,
    deleteLabel,
    refetch: fetchLabels,
  }
}





