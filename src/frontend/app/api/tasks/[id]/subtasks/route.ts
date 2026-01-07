import { NextRequest, NextResponse } from 'next/server'
import { validateAuth } from '@/lib/auth'
import { subtaskSchema } from '@/lib/validations'
import { createSubtask, getSubtasksByTask } from '@/services/subtaskService'
import { ZodError } from 'zod'

export async function GET(
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

    const subtasks = await getSubtasksByTask(params.id, user.userId)

    return NextResponse.json({
      success: true,
      data: subtasks,
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 404 }
      )
    }

    console.error('Error fetching subtasks:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}

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
    const validatedData = subtaskSchema.parse({
      ...body,
      taskId: params.id,
    })

    const subtask = await createSubtask(validatedData, user.userId)

    return NextResponse.json(
      {
        success: true,
        data: subtask,
      },
      { status: 201 }
    )
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

    console.error('Error creating subtask:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}



