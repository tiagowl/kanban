import { NextRequest, NextResponse } from 'next/server'
import { validateAuth } from '@/lib/auth'
import { addLabelToTask, removeLabelFromTask } from '@/services/labelService'

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
    const { labelId } = body

    if (!labelId || typeof labelId !== 'string') {
      return NextResponse.json(
        { success: false, error: { message: 'labelId is required' } },
        { status: 400 }
      )
    }

    await addLabelToTask(params.id, labelId, user.userId)

    return NextResponse.json({
      success: true,
      data: { message: 'Label added to task successfully' },
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 404 }
      )
    }

    console.error('Error adding label to task:', error)
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

    const { searchParams } = new URL(request.url)
    const labelId = searchParams.get('labelId')

    if (!labelId) {
      return NextResponse.json(
        { success: false, error: { message: 'labelId is required' } },
        { status: 400 }
      )
    }

    await removeLabelFromTask(params.id, labelId, user.userId)

    return NextResponse.json({
      success: true,
      data: { message: 'Label removed from task successfully' },
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { success: false, error: { message: error.message } },
        { status: 404 }
      )
    }

    console.error('Error removing label from task:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}



