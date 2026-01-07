import { NextRequest, NextResponse } from 'next/server'
import { validateAuth } from '@/lib/auth'
import { labelSchema } from '@/lib/validations'
import { createLabel, getLabelsByProject } from '@/services/labelService'
import { ZodError } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const user = await validateAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: { message: 'projectId is required' } },
        { status: 400 }
      )
    }

    const labels = await getLabelsByProject(projectId, user.userId)

    return NextResponse.json({
      success: true,
      data: labels,
    })
  } catch (error) {
    console.error('Error fetching labels:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await validateAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = labelSchema.parse(body)

    const label = await createLabel(validatedData, user.userId)

    return NextResponse.json(
      {
        success: true,
        data: label,
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

    console.error('Error creating label:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}





