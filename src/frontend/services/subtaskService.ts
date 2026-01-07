import { prisma } from '@/lib/prisma'
import { Subtask, CreateSubtaskInput, UpdateSubtaskInput } from '@/types'

export async function getSubtasksByTask(taskId: string, userId: string): Promise<Subtask[]> {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      stage: {
        project: {
          userId,
        },
      },
    },
  })

  if (!task) {
    throw new Error('Task not found or unauthorized')
  }

  return prisma.subtask.findMany({
    where: { taskId },
    orderBy: {
      order: 'asc',
    },
  })
}

export async function getSubtaskById(subtaskId: string, userId: string): Promise<Subtask | null> {
  return prisma.subtask.findFirst({
    where: {
      id: subtaskId,
      task: {
        stage: {
          project: {
            userId,
          },
        },
      },
    },
  })
}

export async function createSubtask(input: CreateSubtaskInput, userId: string): Promise<Subtask> {
  const task = await prisma.task.findFirst({
    where: {
      id: input.taskId,
      stage: {
        project: {
          userId,
        },
      },
    },
  })

  if (!task) {
    throw new Error('Task not found or unauthorized')
  }

  const order = input.order !== undefined ? input.order : await getNextOrder(input.taskId)

  return prisma.subtask.create({
    data: {
      ...input,
      completed: input.completed ?? false,
      order,
    },
  })
}

export async function updateSubtask(
  subtaskId: string,
  input: UpdateSubtaskInput,
  userId: string
): Promise<Subtask> {
  const subtask = await prisma.subtask.findFirst({
    where: {
      id: subtaskId,
      task: {
        stage: {
          project: {
            userId,
          },
        },
      },
    },
  })

  if (!subtask) {
    throw new Error('Subtask not found or unauthorized')
  }

  return prisma.subtask.update({
    where: { id: subtaskId },
    data: input,
  })
}

export async function deleteSubtask(subtaskId: string, userId: string): Promise<void> {
  const subtask = await prisma.subtask.findFirst({
    where: {
      id: subtaskId,
      task: {
        stage: {
          project: {
            userId,
          },
        },
      },
    },
  })

  if (!subtask) {
    throw new Error('Subtask not found or unauthorized')
  }

  await prisma.$transaction(async (tx) => {
    // Reordenar sub-tarefas restantes
    await tx.subtask.updateMany({
      where: {
        taskId: subtask.taskId,
        order: {
          gt: subtask.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    })

    // Deletar sub-tarefa
    await tx.subtask.delete({
      where: { id: subtaskId },
    })
  })
}

async function getNextOrder(taskId: string): Promise<number> {
  const lastSubtask = await prisma.subtask.findFirst({
    where: { taskId },
    orderBy: { order: 'desc' },
  })

  return (lastSubtask?.order ?? -1) + 1
}





