import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { handleApiError } from '@/lib/utils/errors'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const etapas = await sql`
      SELECT * FROM etapas
      WHERE projeto_id = ${params.id}
      ORDER BY ordem ASC
    `

    return NextResponse.json({
      success: true,
      data: etapas,
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

