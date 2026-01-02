import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, projectSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [projeto] = await sql`
      SELECT * FROM projetos
      WHERE id = ${params.id}
    `

    if (!projeto) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Projeto não encontrado',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: projeto,
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
    const validation = validateRequest(body, projectSchema)

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

    const [projeto] = await sql`
      UPDATE projetos
      SET nome = ${validation.data!.nome},
          descricao = ${validation.data!.descricao || null}
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!projeto) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Projeto não encontrado',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: projeto,
      message: 'Projeto atualizado com sucesso',
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
    const [projeto] = await sql`
      DELETE FROM projetos
      WHERE id = ${params.id}
      RETURNING *
    `

    if (!projeto) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Projeto não encontrado',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Projeto excluído com sucesso',
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

