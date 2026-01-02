import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, stageSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function POST(request: NextRequest) {
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

    // Pegar próxima ordem se não fornecida
    let ordem = validation.data!.ordem
    if (ordem === undefined) {
      const [max] = await sql`
        SELECT COALESCE(MAX(ordem), -1) + 1 as next_order
        FROM etapas
        WHERE projeto_id = ${validation.data!.projeto_id}
      `
      ordem = max.next_order
    }

    const [etapa] = await sql`
      INSERT INTO etapas (projeto_id, nome, ordem)
      VALUES (${validation.data!.projeto_id}, ${validation.data!.nome}, ${ordem})
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        data: etapa,
        message: 'Etapa criada com sucesso',
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

