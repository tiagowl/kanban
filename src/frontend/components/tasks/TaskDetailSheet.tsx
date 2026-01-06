'use client'

import { useState, useEffect } from 'react'
import { Task, Subtask, Label } from '@/types'
import { api } from '@/lib/api'
import { useLabels } from '@/hooks/useLabels'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label as LabelComponent } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2, Plus, X, Edit2, Save } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface TaskDetailSheetProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted?: (taskId: string) => void
}

export function TaskDetailSheet({
  task: initialTask,
  open,
  onOpenChange,
  onDeleted,
}: TaskDetailSheetProps) {
  const [task, setTask] = useState(initialTask)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [stageId, setStageId] = useState(task.stageId)
  const [stages, setStages] = useState<any[]>([])
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || [])
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { labels } = useLabels(task.stage?.projectId || undefined)

  useEffect(() => {
    setTask(initialTask)
    setTitle(initialTask.title)
    setDescription(initialTask.description || '')
    setStageId(initialTask.stageId)
    setSubtasks(initialTask.subtasks || [])
  }, [initialTask])

  useEffect(() => {
    if (open && task.stage?.projectId) {
      fetchStages()
      fetchSubtasks()
    }
  }, [open, task.stage?.projectId])

  async function fetchStages() {
    try {
      const data = await api.get(`/projects/${task.stage?.projectId}/stages`)
      setStages(data)
    } catch (error) {
      console.error('Error fetching stages:', error)
    }
  }


  async function fetchSubtasks() {
    try {
      const data = await api.get(`/tasks/${task.id}/subtasks`)
      setSubtasks(data)
    } catch (error) {
      console.error('Error fetching subtasks:', error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const updated = await api.patch(`/tasks/${task.id}`, {
        title,
        description: description || undefined,
        stageId,
      })
      setTask(updated)
      setIsEditing(false)
      toast({
        title: 'Sucesso',
        description: 'Tarefa atualizada!',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar a tarefa',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return

    setLoading(true)
    try {
      await api.delete(`/tasks/${task.id}`)
      toast({
        title: 'Sucesso',
        description: 'Tarefa excluída!',
      })
      onDeleted?.(task.id)
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a tarefa',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return

    try {
      const subtask = await api.post(`/tasks/${task.id}/subtasks`, {
        title: newSubtaskTitle,
        taskId: task.id,
      })
      setSubtasks((prev) => [...prev, subtask])
      setNewSubtaskTitle('')
      toast({
        title: 'Sucesso',
        description: 'Sub-tarefa criada!',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar a sub-tarefa',
        variant: 'destructive',
      })
    }
  }

  const handleToggleSubtask = async (subtaskId: string, completed: boolean) => {
    try {
      const updated = await api.patch(`/subtasks/${subtaskId}`, {
        completed: !completed,
      })
      setSubtasks((prev) =>
        prev.map((st) => (st.id === subtaskId ? updated : st))
      )
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar a sub-tarefa',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteSubtask = async (subtaskId: string) => {
    try {
      await api.delete(`/subtasks/${subtaskId}`)
      setSubtasks((prev) => prev.filter((st) => st.id !== subtaskId))
      toast({
        title: 'Sucesso',
        description: 'Sub-tarefa excluída!',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a sub-tarefa',
        variant: 'destructive',
      })
    }
  }

  const handleAddLabel = async (labelId: string) => {
    try {
      await api.post(`/tasks/${task.id}/labels`, { labelId })
      const updated = await api.get(`/tasks/${task.id}`)
      setTask(updated)
      toast({
        title: 'Sucesso',
        description: 'Etiqueta adicionada!',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar a etiqueta',
        variant: 'destructive',
      })
    }
  }

  const handleRemoveLabel = async (labelId: string) => {
    try {
      await api.delete(`/tasks/${task.id}/labels?labelId=${labelId}`)
      const updated = await api.get(`/tasks/${task.id}`)
      setTask(updated)
      toast({
        title: 'Sucesso',
        description: 'Etiqueta removida!',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível remover a etiqueta',
        variant: 'destructive',
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Detalhes da Tarefa</SheetTitle>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSave}
                  disabled={loading}
                >
                  <Save className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="destructive"
                size="icon"
                onClick={handleDelete}
                disabled={loading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <LabelComponent>Título</LabelComponent>
            {isEditing ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da tarefa"
              />
            ) : (
              <p className="text-sm font-medium">{task.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <LabelComponent>Descrição</LabelComponent>
            {isEditing ? (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da tarefa..."
                rows={4}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {task.description || 'Sem descrição'}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="space-y-2">
              <LabelComponent>Etapa</LabelComponent>
              <Select value={stageId} onValueChange={setStageId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <LabelComponent>Etiquetas</LabelComponent>
            <div className="flex flex-wrap gap-2">
              {task.labels?.map((taskLabel) => (
                <Badge
                  key={taskLabel.id}
                  style={{
                    backgroundColor: taskLabel.label?.color + '20',
                    color: taskLabel.label?.color,
                  }}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {taskLabel.label?.name}
                  <button
                    onClick={() => handleRemoveLabel(taskLabel.labelId)}
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Select onValueChange={handleAddLabel}>
              <SelectTrigger>
                <SelectValue placeholder="Adicionar etiqueta" />
              </SelectTrigger>
              <SelectContent>
                {labels
                  .filter(
                    (label) =>
                      !task.labels?.some((tl) => tl.labelId === label.id)
                  )
                  .map((label) => (
                    <SelectItem key={label.id} value={label.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: label.color }}
                        />
                        {label.name}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <LabelComponent>Sub-tarefas</LabelComponent>
            <div className="space-y-2">
              {subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-2 p-2 rounded border"
                >
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() =>
                      handleToggleSubtask(subtask.id, subtask.completed)
                    }
                  />
                  <span
                    className={`flex-1 text-sm ${
                      subtask.completed
                        ? 'line-through text-muted-foreground'
                        : ''
                    }`}
                  >
                    {subtask.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleDeleteSubtask(subtask.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="Nova sub-tarefa..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSubtask()
                  }
                }}
              />
              <Button onClick={handleAddSubtask} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

