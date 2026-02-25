import { prisma } from '@/lib/prisma'
import { Label, CreateLabelInput, UpdateLabelInput } from '@/types'

export async function getLabelsByProject(projectId: string, userId: string): Promise<Label[]> {
  return prisma.label.findMany({
    where: {
      project: {
        id: projectId,
        userId,
      },
    },
    include: {
      tasks: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}

export async function getLabelById(labelId: string, userId: string): Promise<Label | null> {
  return prisma.label.findFirst({
    where: {
      id: labelId,
      project: {
        userId,
      },
    },
  })
}

export async function createLabel(input: CreateLabelInput, userId: string): Promise<Label> {
  const project = await prisma.project.findFirst({
    where: {
      id: input.projectId,
      userId,
    },
  })

  if (!project) {
    throw new Error('Project not found or unauthorized')
  }

  return prisma.label.create({
    data: input,
  })
}

export async function updateLabel(
  labelId: string,
  input: UpdateLabelInput,
  userId: string
): Promise<Label> {
  const label = await prisma.label.findFirst({
    where: {
      id: labelId,
      project: {
        userId,
      },
    },
  })

  if (!label) {
    throw new Error('Label not found or unauthorized')
  }

  return prisma.label.update({
    where: { id: labelId },
    data: input,
  })
}

export async function deleteLabel(labelId: string, userId: string): Promise<void> {
  const label = await prisma.label.findFirst({
    where: {
      id: labelId,
      project: {
        userId,
      },
    },
  })

  if (!label) {
    throw new Error('Label not found or unauthorized')
  }

  // Deletar label (cascade deleta tasklabels)
  await prisma.label.delete({
    where: { id: labelId },
  })
}

export async function addLabelToTask(taskId: string, labelId: string, userId: string): Promise<void> {
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

  const label = await prisma.label.findFirst({
    where: {
      id: labelId,
      project: {
        userId,
      },
    },
  })

  if (!label) {
    throw new Error('Label not found or unauthorized')
  }

  // Verificar se já existe
  const existing = await prisma.taskLabel.findUnique({
    where: {
      taskId_labelId: {
        taskId,
        labelId,
      },
    },
  })

  if (existing) {
    return // Já existe, não precisa criar
  }

  await prisma.taskLabel.create({
    data: {
      taskId,
      labelId,
    },
  })
}

export async function removeLabelFromTask(taskId: string, labelId: string, userId: string): Promise<void> {
  const taskLabel = await prisma.taskLabel.findFirst({
    where: {
      taskId,
      labelId,
      task: {
        stage: {
          project: {
            userId,
          },
        },
      },
    },
  })

  if (!taskLabel) {
    throw new Error('TaskLabel not found or unauthorized')
  }

  await prisma.taskLabel.delete({
    where: {
      id: taskLabel.id,
    },
  })
}






