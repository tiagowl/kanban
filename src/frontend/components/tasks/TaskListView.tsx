'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Task } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { TaskDetailSheet } from './TaskDetailSheet'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TaskForm } from './TaskForm'
import { useToast } from '@/components/ui/use-toast'

interface TaskListViewProps {
  projectId: string
}

export function TaskListView({ projectId }: TaskListViewProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await api.get<Task[]>(`/tasks?projectId=${projectId}`)
        setTasks(data)
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar as tarefas',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [projectId, toast])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsDetailOpen(true)
  }

  const handleTaskDeleted = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
    setIsDetailOpen(false)
    setSelectedTask(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">Nenhuma tarefa criada</p>
          <Button onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeira Tarefa
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => {
            const completedSubtasks = task.subtasks?.filter((st) => st.completed).length || 0
            const totalSubtasks = task.subtasks?.length || 0

            return (
              <Card
                key={task.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleTaskClick(task)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">{task.title}</h3>
                      {task.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {task.stage && (
                          <Badge variant="secondary">{task.stage.name}</Badge>
                        )}
                        {task.labels?.map((taskLabel) => (
                          <Badge
                            key={taskLabel.id}
                            style={{ backgroundColor: taskLabel.label?.color + '20', color: taskLabel.label?.color }}
                            variant="outline"
                          >
                            {taskLabel.label?.name}
                          </Badge>
                        ))}
                        {totalSubtasks > 0 && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3" />
                            {completedSubtasks}/{totalSubtasks}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {selectedTask && (
        <TaskDetailSheet
          task={selectedTask}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          onDeleted={handleTaskDeleted}
        />
      )}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
          </DialogHeader>
          <TaskForm
            stageId={tasks[0]?.stageId || ''}
            onSuccess={(task) => {
              setTasks((prev) => [...prev, task])
              setIsCreateOpen(false)
            }}
            onCancel={() => setIsCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


