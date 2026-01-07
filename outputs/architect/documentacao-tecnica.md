# Documentação Técnica - Sistema Kanban

## Visão Geral

Esta documentação técnica descreve em detalhes a implementação técnica do Sistema Kanban, incluindo stack tecnológica, configurações, padrões de código e estrutura de arquivos.

---

## 1. Stack Tecnológica

### Frontend

**Framework:**
- **Next.js 14+** (App Router)
  - Versão: 14.0.0 ou superior
  - Motivação: Server Components, melhor performance, SEO
  - Documentação: https://nextjs.org/docs

**Bibliotecas Principais:**
- **React 18+**
  - Versão: 18.2.0 ou superior
  - Features: Server Components, Suspense, Concurrent Rendering

- **TypeScript**
  - Versão: 5.0.0 ou superior
  - Configuração: Strict mode ativado
  - Motivação: Type safety, melhor DX

- **Shadcn UI**
  - Versão: Latest
  - Instalação: Via CLI (`npx shadcn-ui@latest add button`)
  - Motivação: Componentes acessíveis, customizáveis

- **Lucide React**
  - Versão: Latest
  - Motivação: Ícones consistentes, tree-shakeable

**Bibliotecas Auxiliares:**
- **@dnd-kit/core** e **@dnd-kit/sortable**
  - Versão: Latest
  - Motivação: Drag and drop moderno, performático
  - Alternativa considerada: react-beautiful-dnd (deprecated)

- **Zod**
  - Versão: Latest
  - Motivação: Validação de schemas, type-safe

- **React Hook Form**
  - Versão: Latest
  - Motivação: Formulários performáticos

- **Axios** ou **fetch nativo**
  - Versão: Latest
  - Motivação: Requisições HTTP

### Backend

**Runtime:**
- **Node.js 18+**
  - Versão: 18.0.0 ou superior (LTS)
  - Motivação: Suporte a Next.js, async/await nativo

**ORM:**
- **Prisma**
  - Versão: 5.0.0 ou superior
  - Motivação: Type-safe, migrations, bom DX
  - Documentação: https://www.prisma.io/docs

**Database:**
- **Neon PostgreSQL**
  - Versão: PostgreSQL 15+
  - Motivação: Serverless, branchs para dev/staging/prod
  - Alternativa considerada: Supabase, Railway

**Autenticação:**
- **next-auth** (opcional, pode usar JWT manual)
  - Versão: Latest
  - Alternativa: JWT manual com bcrypt

### Ferramentas de Desenvolvimento

**Build & Bundler:**
- **Turbopack** (Next.js built-in) ou **Webpack**
  - Next.js usa Turbopack por padrão

**Linting:**
- **ESLint**
  - Config: Next.js recommended
  - Extras: TypeScript, React hooks

**Formatting:**
- **Prettier**
  - Config: Padrão da comunidade

**Type Checking:**
- **TypeScript Compiler (tsc)**
  - Modo: Strict

**Versionamento:**
- **Git**
  - Branching: Git Flow ou GitHub Flow

---

## 2. Estrutura de Projeto

### Estrutura Completa

```
kanban-system/
├── .env                        # Variáveis de ambiente (não versionado)
├── .env.example                # Exemplo de variáveis
├── .gitignore                  # Arquivos ignorados pelo Git
├── next.config.js              # Configuração do Next.js
├── package.json                # Dependências e scripts
├── tsconfig.json               # Configuração TypeScript
├── prisma/
│   ├── schema.prisma           # Schema do Prisma
│   └── migrations/             # Migrations do banco
├── public/                     # Arquivos estáticos
│   └── images/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout raiz
│   ├── page.tsx                # Página inicial (redirect)
│   ├── (auth)/                 # Grupo de rotas de auth
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/            # Grupo de rotas do dashboard
│   │   ├── layout.tsx          # Layout do dashboard
│   │   ├── projects/
│   │   │   ├── page.tsx        # Lista de projetos
│   │   │   └── [id]/
│   │   │       ├── page.tsx    # Detalhes do projeto (Kanban/Lista)
│   │   │       └── settings/
│   │   │           └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   └── api/                    # API Routes
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.ts
│       │   ├── register/
│       │   │   └── route.ts
│       │   └── logout/
│       │       └── route.ts
│       ├── projects/
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── stages/
│       │           └── route.ts
│       ├── stages/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── tasks/
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       ├── move/
│       │       │   └── route.ts
│       │       └── subtasks/
│       │           └── route.ts
│       ├── subtasks/
│       │   └── [id]/
│       │       └── route.ts
│       └── labels/
│           ├── route.ts
│           └── [id]/
│               └── route.ts
├── components/
│   ├── ui/                     # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── kanban/
│   │   ├── KanbanBoard.tsx
│   │   ├── KanbanColumn.tsx
│   │   ├── TaskCard.tsx
│   │   └── AddTaskButton.tsx
│   ├── tasks/
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskDetailSheet.tsx
│   │   └── SubtaskList.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectForm.tsx
│   │   └── ProjectList.tsx
│   ├── labels/
│   │   ├── LabelBadge.tsx
│   │   ├── LabelPicker.tsx
│   │   └── LabelForm.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── Footer.tsx
│       └── Navbar.tsx
├── lib/
│   ├── prisma.ts               # Prisma Client singleton
│   ├── auth.ts                 # Auth utilities (JWT)
│   ├── api.ts                  # API client
│   ├── validations.ts          # Zod schemas
│   └── utils.ts                # Utility functions
├── hooks/
│   ├── useAuth.ts
│   ├── useProjects.ts
│   ├── useTasks.ts
│   ├── useKanban.ts
│   └── useDebounce.ts
├── types/
│   ├── index.ts                # Tipos compartilhados
│   ├── project.ts
│   ├── task.ts
│   └── auth.ts
├── services/                   # Lógica de negócio
│   ├── projectService.ts
│   ├── taskService.ts
│   ├── stageService.ts
│   └── labelService.ts
└── middleware.ts               # Next.js middleware (auth)
```

---

## 3. Configurações

### package.json

```json
{
  "name": "kanban-system",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@prisma/client": "^5.0.0",
    "@dnd-kit/core": "^6.0.0",
    "@dnd-kit/sortable": "^7.0.0",
    "@dnd-kit/utilities": "^3.2.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0",
    "lucide-react": "^0.292.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "prisma": "^5.0.0",
    "eslint": "^8.51.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  // Variáveis de ambiente públicas
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
}

module.exports = nextConfig
```

### .env.example

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# JWT
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Neon (se usando)
NEON_DATABASE_URL="postgresql://..."
```

---

## 4. Schema do Prisma

### prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  projects Project[]

  @@map("users")
}

model Project {
  id          String   @id @default(cuid())
  userId      String
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  stages Stage[]
  labels Label[]

  @@index([userId])
  @@map("projects")
}

model Stage {
  id        String   @id @default(cuid())
  projectId String
  name      String
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  tasks   Task[]

  @@index([projectId])
  @@index([projectId, order])
  @@map("stages")
}

model Task {
  id          String   @id @default(cuid())
  stageId     String
  title       String
  description String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  stage    Stage     @relation(fields: [stageId], references: [id], onDelete: Cascade)
  subtasks Subtask[]
  labels   TaskLabel[]

  @@index([stageId])
  @@index([stageId, order])
  @@map("tasks")
}

model Subtask {
  id        String   @id @default(cuid())
  taskId    String
  title     String
  completed Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  task Task @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@index([taskId])
  @@index([taskId, order])
  @@map("subtasks")
}

model Label {
  id        String   @id @default(cuid())
  projectId String
  name      String
  color     String   // Hex color
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  project Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  tasks   TaskLabel[]

  @@index([projectId])
  @@map("labels")
}

model TaskLabel {
  id        String   @id @default(cuid())
  taskId    String
  labelId   String
  createdAt DateTime @default(now())

  task  Task  @relation(fields: [taskId], references: [id], onDelete: Cascade)
  label Label @relation(fields: [labelId], references: [id], onDelete: Cascade)

  @@unique([taskId, labelId])
  @@index([taskId])
  @@index([labelId])
  @@map("task_labels")
}
```

---

## 5. Padrões de Código

### Convenções de Nomenclatura

**Arquivos:**
- Components: PascalCase (`TaskCard.tsx`)
- Utilities: camelCase (`utils.ts`)
- Types: PascalCase (`Task.ts`)
- Hooks: camelCase com prefixo `use` (`useTasks.ts`)
- Services: camelCase com sufixo `Service` (`taskService.ts`)

**Variáveis e Funções:**
- camelCase para variáveis e funções (`taskTitle`, `getTasks`)
- PascalCase para componentes React (`TaskCard`)
- UPPER_SNAKE_CASE para constantes (`MAX_TASKS_PER_STAGE`)

**Types/Interfaces:**
- PascalCase (`Task`, `Project`, `User`)
- Prefixo `I` não usado (TypeScript best practice)

### Estrutura de Componentes

```typescript
// TaskCard.tsx
import { useState } from 'react'
import { Task } from '@/types'
import { Button } from '@/components/ui/button'

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Handlers
  const handleClick = () => {
    onEdit?.(task)
  }

  // Render
  return (
    <div
      className="task-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Component content */}
    </div>
  )
}
```

### Estrutura de API Routes

```typescript
// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAuth } from '@/lib/auth'
import { taskSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    // 1. Autenticação
    const user = await validateAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Validação de query params
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    // 3. Buscar dados
    const tasks = await prisma.task.findMany({
      where: {
        stage: {
          project: {
            userId: user.id,
            ...(projectId && { id: projectId }),
          },
        },
      },
      include: {
        stage: true,
        labels: {
          include: {
            label: true,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    })

    // 4. Retornar resposta
    return NextResponse.json({
      success: true,
      data: tasks,
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Autenticação
    const user = await validateAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Validação de body
    const body = await request.json()
    const validatedData = taskSchema.parse(body)

    // 3. Verificar ownership
    const stage = await prisma.stage.findFirst({
      where: {
        id: validatedData.stageId,
        project: {
          userId: user.id,
        },
      },
    })

    if (!stage) {
      return NextResponse.json(
        { success: false, error: 'Stage not found' },
        { status: 404 }
      )
    }

    // 4. Criar tarefa
    const task = await prisma.task.create({
      data: {
        ...validatedData,
        order: await getNextOrder(validatedData.stageId),
      },
      include: {
        stage: true,
        labels: {
          include: {
            label: true,
          },
        },
      },
    })

    // 5. Retornar resposta
    return NextResponse.json(
      {
        success: true,
        data: task,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating task:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Estrutura de Services

```typescript
// services/taskService.ts
import { prisma } from '@/lib/prisma'
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types'

export async function getTasksByProject(projectId: string, userId: string): Promise<Task[]> {
  return prisma.task.findMany({
    where: {
      stage: {
        project: {
          id: projectId,
          userId,
        },
      },
    },
    include: {
      stage: true,
      subtasks: true,
      labels: {
        include: {
          label: true,
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })
}

export async function createTask(input: CreateTaskInput, userId: string): Promise<Task> {
  // Verificar ownership
  const stage = await prisma.stage.findFirst({
    where: {
      id: input.stageId,
      project: {
        userId,
      },
    },
  })

  if (!stage) {
    throw new Error('Stage not found or unauthorized')
  }

  // Criar tarefa
  return prisma.task.create({
    data: {
      ...input,
      order: await getNextOrder(input.stageId),
    },
    include: {
      stage: true,
      subtasks: true,
      labels: {
        include: {
          label: true,
        },
      },
    },
  })
}

async function getNextOrder(stageId: string): Promise<number> {
  const lastTask = await prisma.task.findFirst({
    where: { stageId },
    orderBy: { order: 'desc' },
  })

  return (lastTask?.order ?? -1) + 1
}
```

---

## 6. Validações com Zod

### lib/validations.ts

```typescript
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').optional(),
})

export const projectSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
})

export const stageSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
  projectId: z.string().cuid('ID de projeto inválido'),
  order: z.number().int().optional(),
})

export const taskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  description: z.string().max(1000, 'Descrição muito longa').optional(),
  stageId: z.string().cuid('ID de etapa inválido'),
  order: z.number().int().optional(),
})

export const subtaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  taskId: z.string().cuid('ID de tarefa inválido'),
  completed: z.boolean().optional(),
  order: z.number().int().optional(),
})

export const labelSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor inválida (formato hex)'),
  projectId: z.string().cuid('ID de projeto inválido'),
})
```

---

## 7. Autenticação

### lib/auth.ts

```typescript
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function validateAuth(request: NextRequest): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  return verifyToken(token)
}
```

---

## 8. Prisma Client Singleton

### lib/prisma.ts

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 9. API Client

### lib/api.ts

```typescript
const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token') // ou cookie

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new ApiError(
      data.error?.message || 'An error occurred',
      response.status,
      data.error?.code
    )
  }

  return data.data as T
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
}
```

---

## 10. Hooks Customizados

### hooks/useTasks.ts

```typescript
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Task } from '@/types'

export function useTasks(projectId?: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true)
        const endpoint = projectId ? `/tasks?projectId=${projectId}` : '/tasks'
        const data = await api.get<Task[]>(endpoint)
        setTasks(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tasks'))
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [projectId])

  const createTask = async (task: Partial<Task>) => {
    const newTask = await api.post<Task>('/tasks', task)
    setTasks((prev) => [...prev, newTask])
    return newTask
  }

  const updateTask = async (id: string, task: Partial<Task>) => {
    const updated = await api.patch<Task>(`/tasks/${id}`, task)
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    return updated
  }

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
  }
}
```

---

## 11. Tratamento de Erros

### Estratégia Global

**Frontend:**
- Error boundaries do React
- Try-catch em hooks
- Toasts para erros do usuário
- Logs para erros inesperados

**Backend:**
- Try-catch em todas as rotas
- Validação com Zod
- Mensagens de erro padronizadas
- Logs estruturados

**Padrão de Resposta de Erro:**
```typescript
{
  success: false,
  error: {
    code: "TASK_NOT_FOUND",
    message: "Tarefa não encontrada",
    details?: any // Opcional, apenas em dev
  }
}
```

---

## 12. Performance

### Otimizações Implementadas

1. **Server Components**: Quando possível, usar Server Components
2. **Code Splitting**: Automático via Next.js
3. **Image Optimization**: Next.js Image component
4. **Database Indexing**: Índices em campos de busca
5. **Query Optimization**: Select apenas campos necessários
6. **Debounce**: Em inputs de busca
7. **Virtualization**: Para listas longas (react-window)

---

## 13. Testes

### Estratégia de Testes

**Unit Tests:**
- Services
- Utilities
- Hooks

**Integration Tests:**
- API Routes
- Database operations

**E2E Tests:**
- Fluxos principais (Login, Criar Projeto, Criar Tarefa)

**Ferramentas:**
- **Vitest**: Unit e integration tests
- **Playwright**: E2E tests
- **Testing Library**: Component tests

---

## 14. Deploy

### Processo de Deploy

1. **Build**: `npm run build`
2. **Testes**: Rodar test suite
3. **Deploy**: Push para Vercel (ou similar)
4. **Migrations**: Rodar migrations do Prisma
5. **Verificação**: Testar em produção

### Variáveis de Ambiente

Configurar no Vercel (ou plataforma de deploy):
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`

---

## Conclusão

Esta documentação técnica fornece uma base sólida para implementação do Sistema Kanban. Todos os padrões e estruturas foram pensados para facilitar manutenção, escalabilidade e evolução do sistema.

**Próximos Passos:**
1. Configurar projeto Next.js
2. Configurar Prisma
3. Implementar autenticação
4. Criar API routes base
5. Desenvolver componentes principais





