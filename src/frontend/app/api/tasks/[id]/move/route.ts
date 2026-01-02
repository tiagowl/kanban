import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest, moveTaskSchema } from '@/lib/utils/validation'
import { handleApiError } from '@/lib/utils/errors'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validation = validateRequest(body, moveTaskSchema)

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

    const { nova_etapa_id, nova_ordem } = validation.data!

    // Buscar tarefa atual
    const [currentTask] = await sql`
      SELECT * FROM tarefas WHERE id = ${params.id}
    `

    if (!currentTask) {
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

    const targetEtapaId = nova_etapa_id || currentTask.etapa_id

    // Se mudou de etapa, atualizar e recalcular ordens
    if (nova_etapa_id && nova_etapa_id !== currentTask.etapa_id) {
      // Reordenar tarefas na etapa origem (remover a que está sendo movida)
      await sql`
        UPDATE tarefas
        SET ordem = ordem - 1
        WHERE etapa_id = ${currentTask.etapa_id}
        AND ordem > ${currentTask.ordem}
      `

      // Reordenar tarefas na etapa destino (abrir espaço para nova ordem)
      await sql`
        UPDATE tarefas
        SET ordem = ordem + 1
        WHERE etapa_id = ${targetEtapaId}
        AND ordem >= ${nova_ordem}
        AND id != ${params.id}
      `

      // Mover tarefa para nova etapa com nova ordem
      await sql`
        UPDATE tarefas
        SET etapa_id = ${targetEtapaId}, ordem = ${nova_ordem}
        WHERE id = ${params.id}
      `
    } else {
      // Apenas reordenar na mesma etapa
      if (nova_ordem > currentTask.ordem) {
        // Movendo para baixo
        await sql`
          UPDATE tarefas
          SET ordem = ordem - 1
          WHERE etapa_id = ${currentTask.etapa_id}
          AND ordem > ${currentTask.ordem}
          AND ordem <= ${nova_ordem}
        `
      } else if (nova_ordem < currentTask.ordem) {
        // Movendo para cima
        await sql`
          UPDATE tarefas
          SET ordem = ordem + 1
          WHERE etapa_id = ${currentTask.etapa_id}
          AND ordem >= ${nova_ordem}
          AND ordem < ${currentTask.ordem}
        `
      }

      // Atualizar ordem da tarefa
      await sql`
        UPDATE tarefas
        SET ordem = ${nova_ordem}
        WHERE id = ${params.id}
      `
    }

    // Retornar tarefa atualizada
    const [updatedTask] = await sql`
      SELECT * FROM tarefas WHERE id = ${params.id}
    `

    return NextResponse.json({
      success: true,
      data: updatedTask,
      message: 'Tarefa movida com sucesso',
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

