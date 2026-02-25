import { NextRequest, NextResponse } from 'next/server'
import { subtaskSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { validateAuth } = await import('@/lib/auth')
    const { getSubtaskById } = await import('@/services/subtaskService')
    const user = await validateAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const subtask = await getSubtaskById(params.id, user.userId)

    if (!subtask) {
      return NextResponse.json(
        { success: false, error: { message: 'Subtask not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: subtask,
    })
  } catch (error) {
    console.error('Error fetching subtask:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}

export async function PATCH(
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
    const validatedData = subtaskSchema.partial().parse(body)

    const subtask = await updateSubtask(params.id, validatedData, user.userId)

    return NextResponse.json({
      success: true,
      data: subtask,
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

    console.error('Error updating subtask:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { validateAuth } = await import('@/lib/auth')
    const { deleteSubtask } = await import('@/services/subtaskService')
    const user = await validateAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    await deleteSubtask(params.id, user.userId)

    return NextResponse.json({
      success: true,
      data: { message: 'Subtask deleted successfully' },
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 404 }
      )
    }

    console.error('Error deleting subtask:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}






