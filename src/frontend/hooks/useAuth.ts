'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { api, ApiError } from '@/lib/api'

interface User {
  id: string
  email: string
  name: string | null
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Verificar se token é válido (pode fazer uma chamada à API)
      // Por enquanto, apenas verificar se existe
      setUser(JSON.parse(localStorage.getItem('user') || 'null'))
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(data.error?.message || data.error || 'Login failed', response.status)
      }

      // Salvar token e usuário
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      setUser(data.data.user)
      
      // Retornar dados sem fazer redirect aqui - deixar a página de login fazer o redirect
      return data.data
    } catch (error) {
      throw error
    }
  }, [])

  const register = useCallback(async (email: string, password: string, name?: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(data.error?.message || data.error || 'Registration failed', response.status)
      }

      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      setUser(data.data.user)
      
      // Retornar dados sem fazer redirect aqui - deixar a página de registro fazer o redirect
      return data.data
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }, [router])

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}

