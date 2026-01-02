import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, projectSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function GET(request: NextRequest) {
  try {
    const projetos = await sql`
      SELECT * FROM projetos
      ORDER BY criado_em DESC
    `

    return NextResponse.json({
      success: true,
      data: projetos,
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
      INSERT INTO projetos (nome, descricao)
      VALUES (${validation.data!.nome}, ${validation.data!.descricao || null})
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        data: projeto,
        message: 'Projeto criado com sucesso',
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

