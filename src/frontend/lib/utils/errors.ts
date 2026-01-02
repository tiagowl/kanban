export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    return {
      code: 'INTERNAL_ERROR',
      message: error.message || 'Erro interno do servidor',
      statusCode: 500,
    }
  }

  return {
    code: 'INTERNAL_ERROR',
    message: 'Erro interno do servidor',
    statusCode: 500,
  }
}

