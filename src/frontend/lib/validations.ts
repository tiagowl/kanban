import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').optional(),
})

export const projectSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
})

export const stageSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
  projectId: z.string().cuid('ID de projeto inválido'),
  order: z.number().int().optional(),
})

export const taskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  description: z.string().max(1000, 'Descrição muito longa').optional(),
  stageId: z.string().cuid('ID de etapa inválido'),
  order: z.number().int().optional(),
})

export const subtaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  taskId: z.string().cuid('ID de tarefa inválido'),
  completed: z.boolean().optional(),
  order: z.number().int().optional(),
})

export const labelSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor inválida (formato hex)'),
  projectId: z.string().cuid('ID de projeto inválido'),
})

export const moveTaskSchema = z.object({
  stageId: z.string().cuid('ID de etapa inválido'),
  order: z.number().int().optional(),
})





