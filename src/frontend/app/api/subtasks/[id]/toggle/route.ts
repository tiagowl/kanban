import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { handleApiError } from '@/lib/utils/errors'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { concluida } = body

    if (typeof concluida !== 'boolean') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'concluida deve ser um booleano',
          },
        },
        { status: 400 }
      )
    }

    const [subtarefa] = await sql`
      UPDATE subtarefas
      SET concluida = ${concluida}
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

