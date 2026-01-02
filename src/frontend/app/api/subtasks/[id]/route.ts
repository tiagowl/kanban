import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, subtaskSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validar apenas o nome (outros campos não são atualizáveis via PUT)
    const nome = body.nome
    if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Nome é obrigatório',
          },
        },
        { status: 400 }
      )
    }

    const [subtarefa] = await sql`
      UPDATE subtarefas
      SET nome = ${nome.trim()}
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!subtarefa) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Subtarefa não encontrada',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: subtarefa,
      message: 'Subtarefa atualizada com sucesso',
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
    const [subtarefa] = await sql`
      DELETE FROM subtarefas
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!subtarefa) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Subtarefa não encontrada',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Subtarefa excluída com sucesso',
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

