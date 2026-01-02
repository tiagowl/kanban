import { z } from 'zod'

export const projectSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  descricao: z.string().optional(),
})

export const stageSchema = z.object({
  projeto_id: z.string().uuid('ID do projeto inválido'),
  nome: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  ordem: z.number().int().optional(),
})

export const taskSchema = z.object({
  etapa_id: z.string().uuid('ID da etapa inválido'),
  projeto_id: z.string().uuid('ID do projeto inválido'),
  titulo: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
  descricao: z.string().optional(),
  ordem: z.number().int().optional(),
})

export const subtaskSchema = z.object({
  tarefa_id: z.string().uuid('ID da tarefa inválido'),
  nome: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  ordem: z.number().int().optional(),
})

export const moveTaskSchema = z.object({
  nova_etapa_id: z.string().uuid('ID da etapa inválido').optional(),
  nova_ordem: z.number().int('Ordem deve ser um número inteiro').min(0),
})

export function validateRequest<T>(data: unknown, schema: z.ZodSchema<T>) {
  const result = schema.safeParse(data)
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.errors,
      data: null,
    }
  }

  return {
    valid: true,
    errors: null,
    data: result.data,
  }
}

