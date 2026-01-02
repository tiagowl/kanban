import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, taskSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [tarefa] = await sql`
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
      WHERE t.id = ${params.id}
      GROUP BY t.id
    `

    if (!tarefa) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Tarefa não encontrada',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: tarefa,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const [tarefa] = await sql`
      UPDATE tarefas
      SET titulo = ${validation.data!.titulo},
          descricao = ${validation.data!.descricao || null},
          etapa_id = ${validation.data!.etapa_id}
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!tarefa) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Tarefa não encontrada',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: tarefa,
      message: 'Tarefa atualizada com sucesso',
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [tarefa] = await sql`
      DELETE FROM tarefas
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!tarefa) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Tarefa não encontrada',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Tarefa excluída com sucesso',
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

