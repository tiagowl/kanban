import { NextRequest, NextResponse } from 'next/server'
import { validateAuth } from '@/lib/auth'
import { stageSchema } from '@/lib/validations'
import { createStage, getStagesByProject } from '@/services/stageService'
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

    const stages = await getStagesByProject(params.id, user.userId)

    return NextResponse.json({
      success: true,
      data: stages,
    })
  } catch (error) {
    console.error('Error fetching stages:', error)
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
    const validatedData = stageSchema.parse({
      ...body,
      projectId: params.id,
    })

    const stage = await createStage(validatedData, user.userId)

    return NextResponse.json(
      {
        success: true,
        data: stage,
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

    console.error('Error creating stage:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}





