'use client'

import { useState, useEffect, useCallback } from 'react'
import { api, ApiError } from '@/lib/api'
import { Project, CreateProjectInput, UpdateProjectInput } from '@/types'
import { useToast } from '@/components/ui/use-toast'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.get<Project[]>('/projects')
      setProjects(data)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch projects')
      setError(error)
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const createProject = useCallback(async (input: CreateProjectInput) => {
    try {
      const newProject = await api.post<Project>('/projects', input)
      setProjects((prev) => [newProject, ...prev])
      toast({
        title: 'Sucesso',
        description: 'Projeto criado com sucesso!',
      })
      return newProject
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create project')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  const updateProject = useCallback(async (id: string, input: UpdateProjectInput) => {
    try {
      const updated = await api.patch<Project>(`/projects/${id}`, input)
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
      toast({
        title: 'Sucesso',
        description: 'Projeto atualizado com sucesso!',
      })
      return updated
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update project')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  const deleteProject = useCallback(async (id: string) => {
    try {
      await api.delete(`/projects/${id}`)
      setProjects((prev) => prev.filter((p) => p.id !== id))
      toast({
        title: 'Sucesso',
        description: 'Projeto excluído com sucesso!',
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete project')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  }
}


