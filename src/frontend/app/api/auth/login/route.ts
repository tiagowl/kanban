import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    const { prisma } = await import('@/lib/prisma')
    const { comparePassword, generateToken } = await import('@/lib/auth')

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'Email ou senha inválidos' } },
        { status: 401 }
      )
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: { message: 'Email ou senha inválidos' } },
        { status: 401 }
      )
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    })

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Dados inválidos',
            details: error.errors,
          },
        },
        { status: 400 }
      )
    }

    console.error('Error in login:', error)
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}






