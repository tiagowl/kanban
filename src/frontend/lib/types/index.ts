export interface Projeto {
  id: string
  nome: string
  descricao?: string | null
  criado_em: string
  atualizado_em: string
}

export interface Etapa {
  id: string
  projeto_id: string
  nome: string
  ordem: number
  criado_em: string
  atualizado_em: string
}

export interface Tarefa {
  id: string
  etapa_id: string
  projeto_id: string
  titulo: string
  descricao?: string | null
  ordem: number
  criado_em: string
  atualizado_em: string
  subtarefas?: Subtarefa[]
}

export interface Subtarefa {
  id: string
  tarefa_id: string
  nome: string
  concluida: boolean
  ordem: number
  criado_em: string
  atualizado_em: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  message?: string
}

export interface CreateProjetoInput {
  nome: string
  descricao?: string
}

export interface CreateEtapaInput {
  projeto_id: string
  nome: string
  ordem?: number
}

export interface CreateTarefaInput {
  etapa_id: string
  projeto_id: string
  titulo: string
  descricao?: string
  ordem?: number
}

export interface CreateSubtarefaInput {
  tarefa_id: string
  nome: string
  ordem?: number
}

export interface MoveTaskInput {
  tarefa_id: string
  nova_etapa_id?: string
  nova_ordem: number
}

