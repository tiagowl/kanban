import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Logout é principalmente do lado do cliente (remover token)
  // Mas podemos ter lógica adicional aqui se necessário (blacklist de tokens, etc)
  return NextResponse.json({
    success: true,
    data: { message: 'Logout realizado com sucesso' },
  })
}






