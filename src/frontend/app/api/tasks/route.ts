import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, taskSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projetoId = searchParams.get('projeto_id')
    const etapaId = searchParams.get('etapa_id')

    let tarefas

    if (projetoId) {
      tarefas = await sql`
        SELECT t.*,
          COALESCE(
            json_agg(
              json_build_object(
                'id', s.id,
                'tarefa_id', s.tarefa_id,
                'nome', s.nome,
                'concluida', s.concluida,
                'ordem', s.ordem,
                'criado_em', s.criado_em,
                'atualizado_em', s.atualizado_em
              )
              ORDER BY s.ordem ASC
            ) FILTER (WHERE s.id IS NOT NULL),
            '[]'::json
          ) as subtarefas
        FROM tarefas t
        LEFT JOIN subtarefas s ON t.id = s.tarefa_id
        WHERE t.projeto_id = ${projetoId}
        GROUP BY t.id
        ORDER BY t.ordem ASC
      `
    } else if (etapaId) {
      tarefas = await sql`
        SELECT t.*,
          COALESCE(
            json_agg(
              json_build_object(
                'id', s.id,
                'tarefa_id', s.tarefa_id,
                'nome', s.nome,
                'concluida', s.concluida,
                'ordem', s.ordem,
                'criado_em', s.criado_em,
                'atualizado_em', s.atualizado_em
              )
              ORDER BY s.ordem ASC
            ) FILTER (WHERE s.id IS NOT NULL),
            '[]'::json
          ) as subtarefas
        FROM tarefas t
        LEFT JOIN subtarefas s ON t.id = s.tarefa_id
        WHERE t.etapa_id = ${etapaId}
        GROUP BY t.id
        ORDER BY t.ordem ASC
      `
    } else {
      tarefas = await sql`
        SELECT t.*,
          COALESCE(
            json_agg(
              json_build_object(
                'id', s.id,
                'tarefa_id', s.tarefa_id,
                'nome', s.nome,
                'concluida', s.concluida,
                'ordem', s.ordem,
                'criado_em', s.criado_em,
                'atualizado_em', s.atualizado_em
              )
              ORDER BY s.ordem ASC
            ) FILTER (WHERE s.id IS NOT NULL),
            '[]'::json
          ) as subtarefas
        FROM tarefas t
        LEFT JOIN subtarefas s ON t.id = s.tarefa_id
        GROUP BY t.id
        ORDER BY t.criado_em DESC
      `
    }

    return NextResponse.json({
      success: true,
      data: tarefas,
    })
  } catch (error) {
    const { code, message, statusCode } = handleApiError(error)
    return NextResponse.json(
      {
        success: false,
        error: { code, message },
      },
      { status: statusCode }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateRequest(body, taskSchema)

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Dados inválidos',
            details: validation.errors,
          },
        },
        { status: 400 }
      )
    }

    // Pegar próxima ordem se não fornecida
    let ordem = validation.data!.ordem
    if (ordem === undefined) {
      const [max] = await sql`
        SELECT COALESCE(MAX(ordem), -1) + 1 as next_order
        FROM tarefas
        WHERE etapa_id = ${validation.data!.etapa_id}
      `
      ordem = max.next_order
    }

    const [tarefa] = await sql`
      INSERT INTO tarefas (etapa_id, projeto_id, titulo, descricao, ordem)
      VALUES (
        ${validation.data!.etapa_id},
        ${validation.data!.projeto_id},
        ${validation.data!.titulo},
        ${validation.data!.descricao || null},
        ${ordem}
      )
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        data: { ...tarefa, subtarefas: [] },
        message: 'Tarefa criada com sucesso',
      },
      { status: 201 }
    )
  } catch (error) {
    const { code, message, statusCode } = handleApiError(error)
    return NextResponse.json(
      {
        success: false,
        error: { code, message },
      },
      { status: statusCode }
    )
  }
}

