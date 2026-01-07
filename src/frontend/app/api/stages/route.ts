import { NextRequest, NextResponse } from 'next/server'
import { validateAuth } from '@/lib/auth'
import { getStagesByProject } from '@/services/stageService'

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



