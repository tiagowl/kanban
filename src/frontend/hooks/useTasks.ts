'use client'

import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import { Task, CreateTaskInput, UpdateTaskInput, MoveTaskInput } from '@/types'
import { useToast } from '@/components/ui/use-toast'

export function useTasks(projectId?: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchTasks = useCallback(async () => {
    if (!projectId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await api.get<Task[]>(`/tasks?projectId=${projectId}`)
      setTasks(data)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch tasks')
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
    fetchTasks()
  }, [fetchTasks])

  const createTask = useCallback(async (input: CreateTaskInput) => {
    try {
      const newTask = await api.post<Task>('/tasks', input)
      setTasks((prev) => [...prev, newTask])
      toast({
        title: 'Sucesso',
        description: 'Tarefa criada com sucesso!',
      })
      return newTask
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create task')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  const updateTask = useCallback(async (id: string, input: UpdateTaskInput) => {
    try {
      const updated = await api.patch<Task>(`/tasks/${id}`, input)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      toast({
        title: 'Sucesso',
        description: 'Tarefa atualizada com sucesso!',
      })
      return updated
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update task')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  const moveTask = useCallback(async (id: string, input: MoveTaskInput) => {
    try {
      // Optimistic update
      const task = tasks.find((t) => t.id === id)
      if (task) {
        setTasks((prev) => {
          const filtered = prev.filter((t) => t.id !== id)
          return [...filtered, { ...task, stageId: input.stageId, order: input.order ?? task.order }]
        })
      }

      const updated = await api.post<Task>(`/tasks/${id}/move`, input)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      toast({
        title: 'Sucesso',
        description: 'Tarefa movida com sucesso!',
      })
      return updated
    } catch (err) {
      // Revert optimistic update
      fetchTasks()
      const error = err instanceof Error ? err : new Error('Failed to move task')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [tasks, toast, fetchTasks])

  const deleteTask = useCallback(async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      toast({
        title: 'Sucesso',
        description: 'Tarefa excluída com sucesso!',
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete task')
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
      throw error
    }
  }, [toast])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    moveTask,
    deleteTask,
    refetch: fetchTasks,
  }
}


