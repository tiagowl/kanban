import { NextRequest, NextResponse } from 'next/server'
import { validateAuth } from '@/lib/auth'
import { moveTaskSchema } from '@/lib/validations'
import { moveTask } from '@/services/taskService'
import { ZodError } from 'zod'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await validateAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { stageId, order } = moveTaskSchema.parse(body)

    const task = await moveTask(params.id, stageId, order, user.userId)

    return NextResponse.json({
      success: true,
      data: task,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Validation error',
            details: error.errors,
          },
        },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 404 }
      )
    }

    console.error('Error moving task:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}



