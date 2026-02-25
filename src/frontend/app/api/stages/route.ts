import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { validateAuth } = await import('@/lib/auth')
    const { getStagesByProject } = await import('@/services/stageService')
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

    const stages = await getStagesByProject(projectId, user.userId)

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






