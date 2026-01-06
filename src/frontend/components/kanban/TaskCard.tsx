'use client'

import { Task } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TaskDetailSheet } from '@/components/tasks/TaskDetailSheet'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TaskCardProps {
  task: Task
  isDragging?: boolean
  onDeleted?: (taskId: string) => void
}

export function TaskCard({ task, isDragging: externalDragging, onDeleted }: TaskCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
    disabled: externalDragging,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    opacity: (isDragging || externalDragging) ? 0.3 : 1,
    touchAction: 'none' as const,
  }

  const completedSubtasks = task.subtasks?.filter((st) => st.completed).length || 0
  const totalSubtasks = task.subtasks?.length || 0

  const handleOpenDetails = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDetailOpen(true)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    // Double click no card também abre detalhes
    if (!isDragging && !externalDragging) {
      e.preventDefault()
      e.stopPropagation()
      setIsDetailOpen(true)
    }
  }

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        onDoubleClick={handleDoubleClick}
        className={`hover:shadow-lg transition-shadow ${
          isDragging ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
      >
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 
              {...listeners}
              {...attributes}
              className="font-semibold text-sm sm:text-base flex-1 cursor-grab active:cursor-grabbing min-w-0"
              style={{ touchAction: 'none' }}
            >
              <span className="line-clamp-2">{task.title}</span>
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0"
              onClick={handleOpenDetails}
              title="Ver detalhes"
            >
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
          {task.description && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
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
        </CardContent>
      </Card>

      <TaskDetailSheet
        task={task}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onDeleted={onDeleted}
      />
    </>
  )
}
