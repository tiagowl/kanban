import { prisma } from '@/lib/prisma'
import { Stage, CreateStageInput, UpdateStageInput } from '@/types'

export async function getStagesByProject(projectId: string, userId: string): Promise<Stage[]> {
  return prisma.stage.findMany({
    where: {
      project: {
        id: projectId,
        userId,
      },
    },
    include: {
      tasks: {
        orderBy: {
          order: 'asc',
        },
        include: {
          subtasks: true,
          labels: {
            include: {
              label: true,
            },
          },
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })
}

export async function getStageById(stageId: string, userId: string): Promise<Stage | null> {
  return prisma.stage.findFirst({
    where: {
      id: stageId,
      project: {
        userId,
      },
    },
    include: {
      tasks: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  })
}

export async function createStage(input: CreateStageInput, userId: string): Promise<Stage> {
  const project = await prisma.project.findFirst({
    where: {
      id: input.projectId,
      userId,
    },
  })

  if (!project) {
    throw new Error('Project not found or unauthorized')
  }

  const order = input.order !== undefined ? input.order : await getNextOrder(input.projectId)

  return prisma.stage.create({
    data: {
      ...input,
      order,
    },
    include: {
      tasks: true,
    },
  })
}

export async function updateStage(
  stageId: string,
  input: UpdateStageInput,
  userId: string
): Promise<Stage> {
  const stage = await prisma.stage.findFirst({
    where: {
      id: stageId,
      project: {
        userId,
      },
    },
  })

  if (!stage) {
    throw new Error('Stage not found or unauthorized')
  }

  // Se está mudando a ordem, precisamos reordenar as outras etapas
  if (input.order !== undefined && input.order !== stage.order) {
    return await reorderStages(stageId, input.order, stage.projectId, userId)
  }

  return prisma.stage.update({
    where: { id: stageId },
    data: input,
    include: {
      tasks: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  })
}

async function reorderStages(
  stageId: string,
  newOrder: number,
  projectId: string,
  userId: string
): Promise<Stage> {
  const stage = await prisma.stage.findFirst({
    where: {
      id: stageId,
      project: {
        userId,
      },
    },
  })

  if (!stage) {
    throw new Error('Stage not found or unauthorized')
  }

  const oldOrder = stage.order

  return await prisma.$transaction(async (tx) => {
    if (newOrder > oldOrder) {
      // Movendo para baixo
      await tx.stage.updateMany({
        where: {
          projectId,
          order: {
            gt: oldOrder,
            lte: newOrder,
          },
          id: {
            not: stageId,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      })
    } else {
      // Movendo para cima
      await tx.stage.updateMany({
        where: {
          projectId,
          order: {
            gte: newOrder,
            lt: oldOrder,
          },
          id: {
            not: stageId,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      })
    }

    return await tx.stage.update({
      where: { id: stageId },
      data: { order: newOrder },
      include: {
        tasks: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })
  })
}

export async function deleteStage(stageId: string, userId: string): Promise<void> {
  const stage = await prisma.stage.findFirst({
    where: {
      id: stageId,
      project: {
        userId,
      },
    },
    include: {
      tasks: true,
    },
  })

  if (!stage) {
    throw new Error('Stage not found or unauthorized')
  }

  if (stage.tasks.length > 0) {
    throw new Error('Cannot delete stage with tasks. Move or delete tasks first.')
  }

  await prisma.$transaction(async (tx) => {
    // Reordenar etapas restantes
    await tx.stage.updateMany({
      where: {
        projectId: stage.projectId,
        order: {
          gt: stage.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    })

    // Deletar etapa
    await tx.stage.delete({
      where: { id: stageId },
    })
  })
}

async function getNextOrder(projectId: string): Promise<number> {
  const lastStage = await prisma.stage.findFirst({
    where: { projectId },
    orderBy: { order: 'desc' },
  })

  return (lastStage?.order ?? -1) + 1
}


