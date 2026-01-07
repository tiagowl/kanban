import { prisma } from '@/lib/prisma'
import { Project, CreateProjectInput, UpdateProjectInput } from '@/types'

export async function getProjectsByUser(userId: string): Promise<Project[]> {
  return prisma.project.findMany({
    where: { userId },
    include: {
      stages: {
        orderBy: {
          order: 'asc',
        },
      },
      labels: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export async function getProjectById(projectId: string, userId: string): Promise<Project | null> {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    include: {
      stages: {
        orderBy: {
          order: 'asc',
        },
        include: {
          tasks: {
            orderBy: {
              order: 'asc',
            },
            include: {
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
          },
        },
      },
      labels: true,
    },
  })
}

export async function createProject(input: CreateProjectInput, userId: string): Promise<Project> {
  return prisma.project.create({
    data: {
      ...input,
      userId,
      stages: {
        create: [
          { name: 'Backlog', order: 0 },
          { name: 'To Do', order: 1 },
          { name: 'Doing', order: 2 },
          { name: 'Done', order: 3 },
        ],
      },
    },
    include: {
      stages: {
        orderBy: {
          order: 'asc',
        },
      },
      labels: true,
    },
  })
}

export async function updateProject(
  projectId: string,
  input: UpdateProjectInput,
  userId: string
): Promise<Project> {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  })

  if (!project) {
    throw new Error('Project not found or unauthorized')
  }

  return prisma.project.update({
    where: { id: projectId },
    data: input,
    include: {
      stages: {
        orderBy: {
          order: 'asc',
        },
      },
      labels: true,
    },
  })
}

export async function deleteProject(projectId: string, userId: string): Promise<void> {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  })

  if (!project) {
    throw new Error('Project not found or unauthorized')
  }

  await prisma.project.delete({
    where: { id: projectId },
  })
}



