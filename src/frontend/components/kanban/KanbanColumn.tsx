'use client'

import { useState } from 'react'
import { Stage, Task } from '@/types'
import { TaskCard } from './TaskCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TaskForm } from '@/components/tasks/TaskForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface KanbanColumnProps {
  stage: Stage
  tasks: Task[]
  projectId: string
  activeTaskId?: string | null
  onTaskCreated: (task: Task) => void
  onTaskDeleted: (taskId: string) => void
}

export function KanbanColumn({
  stage,
  tasks,
  projectId,
  activeTaskId,
  onTaskCreated,
  onTaskDeleted,
}: KanbanColumnProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: {
      type: 'stage',
      stage,
    },
  })

  return (
    <div className="flex-shrink-0 w-80">
      <Card
        ref={setNodeRef}
        className={`h-full transition-all ${
          isOver ? 'ring-2 ring-primary ring-offset-2 bg-accent/50' : ''
        }`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>{stage.name}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {tasks.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isDragging={activeTaskId === task.id}
                onDeleted={onTaskDeleted}
              />
            ))}
          </SortableContext>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar tarefa
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
          </DialogHeader>
          <TaskForm
            stageId={stage.id}
            onSuccess={(task) => {
              onTaskCreated(task)
              setIsCreateOpen(false)
            }}
            onCancel={() => setIsCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

