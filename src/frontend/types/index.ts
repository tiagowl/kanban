export interface User {
  id: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  userId: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  stages?: Stage[]
  labels?: Label[]
}

export interface Stage {
  id: string
  projectId: string
  name: string
  order: number
  createdAt: Date
  updatedAt: Date
  tasks?: Task[]
}

export interface Task {
  id: string
  stageId: string
  title: string
  description: string | null
  order: number
  createdAt: Date
  updatedAt: Date
  stage?: Stage
  subtasks?: Subtask[]
  labels?: TaskLabel[]
}

export interface Subtask {
  id: string
  taskId: string
  title: string
  completed: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Label {
  id: string
  projectId: string
  name: string
  color: string
  createdAt: Date
  updatedAt: Date
}

export interface TaskLabel {
  id: string
  taskId: string
  labelId: string
  createdAt: Date
  label?: Label
}

export type CreateProjectInput = {
  name: string
  description?: string
}

export type UpdateProjectInput = {
  name?: string
  description?: string
}

export type CreateStageInput = {
  name: string
  projectId: string
  order?: number
}

export type UpdateStageInput = {
  name?: string
  order?: number
}

export type CreateTaskInput = {
  title: string
  description?: string
  stageId: string
  order?: number
}

export type UpdateTaskInput = {
  title?: string
  description?: string
  stageId?: string
  order?: number
}

export type MoveTaskInput = {
  stageId: string
  order?: number
}

export type CreateSubtaskInput = {
  title: string
  taskId: string
  completed?: boolean
  order?: number
}

export type UpdateSubtaskInput = {
  title?: string
  completed?: boolean
  order?: number
}

export type CreateLabelInput = {
  name: string
  color: string
  projectId: string
}

export type UpdateLabelInput = {
  name?: string
  color?: string
}

export type ViewMode = 'kanban' | 'list'






