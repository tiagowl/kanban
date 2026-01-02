import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, subtaskSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tarefaId = searchParams.get('tarefa_id')

    if (!tarefaId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'tarefa_id é obrigatório',
          },
        },
        { status: 400 }
      )
    }

    const subtarefas = await sql`
      SELECT * FROM subtarefas
      WHERE tarefa_id = ${tarefaId}
      ORDER BY ordem ASC
    `

    return NextResponse.json({
      success: true,
      data: subtarefas,
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
    const validation = validateRequest(body, subtaskSchema)

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
        FROM subtarefas
        WHERE tarefa_id = ${validation.data!.tarefa_id}
      `
      ordem = max.next_order
    }

    const [subtarefa] = await sql`
      INSERT INTO subtarefas (tarefa_id, nome, ordem)
      VALUES (${validation.data!.tarefa_id}, ${validation.data!.nome}, ${ordem})
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        data: subtarefa,
        message: 'Subtarefa criada com sucesso',
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

