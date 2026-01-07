import { prisma } from '@/lib/prisma'
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types'

export async function getTasksByProject(projectId: string, userId: string): Promise<Task[]> {
  return prisma.task.findMany({
    where: {
      stage: {
        project: {
          id: projectId,
          userId,
        },
      },
    },
    include: {
      stage: true,
      subtasks: {
        orderBy: {
          order: 'asc',
        },
      },
      labels: {
        include: {
          label: true,
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })
}

export async function getTaskById(taskId: string, userId: string): Promise<Task | null> {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      stage: {
        project: {
          userId,
        },
      },
    },
    include: {
      stage: true,
      subtasks: {
        orderBy: {
          order: 'asc',
        },
      },
      labels: {
        include: {
          label: true,
        },
      },
    },
  })
}

export async function createTask(input: CreateTaskInput, userId: string): Promise<Task> {
  const stage = await prisma.stage.findFirst({
    where: {
      id: input.stageId,
      project: {
        userId,
      },
    },
  })

  if (!stage) {
    throw new Error('Stage not found or unauthorized')
  }

  const order = await getNextOrder(input.stageId)

  return prisma.task.create({
    data: {
      ...input,
      order,
    },
    include: {
      stage: true,
      subtasks: true,
      labels: {
        include: {
          label: true,
        },
      },
    },
  })
}

export async function updateTask(
  taskId: string,
  input: UpdateTaskInput,
  userId: string
): Promise<Task> {
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

  return prisma.task.update({
    where: { id: taskId },
    data: input,
    include: {
      stage: true,
      subtasks: {
        orderBy: {
          order: 'asc',
        },
      },
      labels: {
        include: {
          label: true,
        },
      },
    },
  })
}

export async function moveTask(
  taskId: string,
  stageId: string,
  order: number | undefined,
  userId: string
): Promise<Task> {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      stage: {
        project: {
          userId,
        },
      },
    },
    include: {
      stage: true,
    },
  })

  if (!task) {
    throw new Error('Task not found or unauthorized')
  }

  const newStage = await prisma.stage.findFirst({
    where: {
      id: stageId,
      project: {
        userId,
        id: task.stage.projectId,
      },
    },
  })

  if (!newStage) {
    throw new Error('Stage not found or unauthorized')
  }

  const newOrder = order !== undefined ? order : await getNextOrder(stageId)

  return prisma.$transaction(async (tx) => {
    // Atualizar ordem das tarefas na etapa original (se necessário)
    if (task.stageId !== stageId) {
      await tx.task.updateMany({
        where: {
          stageId: task.stageId,
          order: {
            gt: task.order,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      })
    }

    // Atualizar ordem das tarefas na nova etapa
    await tx.task.updateMany({
      where: {
        stageId,
        order: {
          gte: newOrder,
        },
        id: {
          not: taskId,
        },
      },
      data: {
        order: {
          increment: 1,
        },
      },
    })

    // Mover a tarefa
    return tx.task.update({
      where: { id: taskId },
      data: {
        stageId,
        order: newOrder,
      },
      include: {
        stage: true,
        subtasks: {
          orderBy: {
            order: 'asc',
          },
        },
        labels: {
          include: {
            label: true,
          },
        },
      },
    })
  })
}

export async function deleteTask(taskId: string, userId: string): Promise<void> {
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

  await prisma.$transaction(async (tx) => {
    // Reordenar tarefas restantes
    await tx.task.updateMany({
      where: {
        stageId: task.stageId,
        order: {
          gt: task.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    })

    // Deletar tarefa (cascade deleta subtasks e tasklabels)
    await tx.task.delete({
      where: { id: taskId },
    })
  })
}

async function getNextOrder(stageId: string): Promise<number> {
  const lastTask = await prisma.task.findFirst({
    where: { stageId },
    orderBy: { order: 'desc' },
  })

  return (lastTask?.order ?? -1) + 1
}





