import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, stageSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validation = validateRequest(body, stageSchema)

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

    const [etapa] = await sql`
      UPDATE etapas
      SET nome = ${validation.data!.nome}
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!etapa) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Etapa não encontrada',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: etapa,
      message: 'Etapa atualizada com sucesso',
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
    const [etapa] = await sql`
      DELETE FROM etapas
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!etapa) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Etapa não encontrada',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Etapa excluída com sucesso',
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

