import { NextRequest, NextResponse } from 'next/server'
import { validateAuth } from '@/lib/auth'
import { stageSchema } from '@/lib/validations'
import { getStageById, updateStage, deleteStage } from '@/services/stageService'
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

    const stage = await getStageById(params.id, user.userId)

    if (!stage) {
      return NextResponse.json(
        { success: false, error: { message: 'Stage not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: stage,
    })
  } catch (error) {
    console.error('Error fetching stage:', error)
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
    const validatedData = stageSchema.partial().parse(body)

    const stage = await updateStage(params.id, validatedData, user.userId)

    return NextResponse.json({
      success: true,
      data: stage,
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

    console.error('Error updating stage:', error)
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
    const user = await validateAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    await deleteStage(params.id, user.userId)

    return NextResponse.json({
      success: true,
      data: { message: 'Stage deleted successfully' },
    })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { success: false, error: { message: error.message } },
          { status: 404 }
        )
      }
      if (error.message.includes('Cannot delete')) {
        return NextResponse.json(
          { success: false, error: { message: error.message } },
          { status: 400 }
        )
      }
    }

    console.error('Error deleting stage:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}



