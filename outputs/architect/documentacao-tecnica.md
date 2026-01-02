# Documentação Técnica - Sistema Kanban

## 1. Visão Geral

Este documento fornece a documentação técnica completa do sistema Kanban, incluindo stack tecnológica, configurações, padrões de código e detalhes de implementação.

---

## 2. Stack Tecnológica

### 2.1 Frontend

**Framework:** Next.js 14+ (App Router)
- **Versão:** 14.x ou superior
- **Razão:** Framework React com SSR, API Routes integradas, otimizações automáticas
- **Recursos Utilizados:**
  - App Router para roteamento
  - Server Components e Client Components
  - API Routes para backend
  - File-based routing

**Biblioteca UI:** React 18+
- **Versão:** 18.x ou superior
- **Recursos:**
  - Hooks (useState, useEffect, useContext)
  - Context API para state management
  - Concurrent features

**Biblioteca de Drag and Drop:**
- **Opção 1 (Recomendada):** @dnd-kit/core + @dnd-kit/sortable
  - Moderna, acessível, performática
  - Suporte a touch devices
- **Opção 2:** react-beautiful-dnd
  - Mais antiga, mas amplamente usada
  - Boa documentação

**TypeScript:** 5.x
- Tipagem estática
- Melhor DX e manutenibilidade

**Estilização:**
- **CSS Modules** ou **Tailwind CSS**
- **Recomendação:** Tailwind CSS para design system consistente

---

### 2.2 Backend

**Runtime:** Node.js 18+ (via Next.js)
- **API Routes:** Integradas no Next.js
- **Handler Pattern:** Route Handlers (App Router)

**Database Client:** Neon SDK
- **SDK:** @neondatabase/serverless
- **Versão:** Latest
- **Conexão:** Connection pooling automático
- **Query Builder:** SQL direto ou query builder opcional

---

### 2.3 Database

**Database:** Neon PostgreSQL
- **Versão:** PostgreSQL 15+
- **Tipo:** Serverless PostgreSQL
- **Features:**
  - Auto-scaling
  - Connection pooling
  - Branching para dev/staging
  - Backups automáticos

---

## 3. Estrutura de Projeto

### 3.1 Estrutura de Diretórios

```
kanban/
├── .env.local                 # Variáveis de ambiente
├── .env.example               # Exemplo de variáveis
├── .gitignore
├── next.config.js             # Configuração Next.js
├── package.json
├── tsconfig.json              # Configuração TypeScript
├── tailwind.config.js         # Configuração Tailwind (se usado)
│
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page (redirect ou dashboard)
│   ├── globals.css            # Estilos globais
│   │
│   ├── (dashboard)/           # Route group
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Lista de projetos
│   │   └── [projectId]/
│   │       ├── page.tsx       # Board Kanban
│   │       └── loading.tsx
│   │
│   └── api/                   # API Routes
│       ├── projects/
│       ├── stages/
│       ├── tasks/
│       └── subtasks/
│
├── components/                # Componentes React
│   ├── ui/                    # Componentes base (Design System)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── card.tsx
│   │   └── toast.tsx
│   │
│   ├── kanban/                # Componentes Kanban
│   │   ├── board.tsx
│   │   ├── column.tsx
│   │   ├── task-card.tsx
│   │   └── drag-context.tsx
│   │
│   ├── projects/              # Componentes de Projetos
│   │   ├── project-card.tsx
│   │   ├── project-list.tsx
│   │   └── project-form.tsx
│   │
│   ├── tasks/                 # Componentes de Tarefas
│   │   ├── task-modal.tsx
│   │   ├── task-form.tsx
│   │   ├── subtask-list.tsx
│   │   └── subtask-item.tsx
│   │
│   └── shared/                # Componentes compartilhados
│       ├── header.tsx
│       ├── layout.tsx
│       └── loading.tsx
│
├── lib/                       # Utilitários e configurações
│   ├── db/
│   │   └── neon.ts            # Configuração Neon SDK
│   │
│   ├── api/
│   │   └── client.ts          # Cliente API (fetch wrapper)
│   │
│   ├── utils/
│   │   ├── validation.ts      # Schemas de validação
│   │   └── errors.ts          # Error handling utilities
│   │
│   └── types/
│       └── index.ts           # TypeScript types/interfaces
│
├── hooks/                     # Custom React Hooks
│   ├── use-projects.ts
│   ├── use-tasks.ts
│   ├── use-drag-drop.ts
│   └── use-optimistic-updates.ts
│
└── public/                    # Arquivos estáticos
    └── assets/
```

---

## 4. Configurações

### 4.1 Variáveis de Ambiente

**.env.local:**
```env
# Database
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API
API_SECRET_KEY=your-secret-key-here
```

**.env.example:**
```env
DATABASE_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_SECRET_KEY=
```

---

### 4.2 Configuração Next.js

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true, // Se usar Server Actions
  },
  // Configurações de imagem se necessário
  images: {
    domains: [],
  },
}

module.exports = nextConfig
```

---

### 4.3 Configuração TypeScript

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
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

---

## 5. Configuração do Banco de Dados

### 5.1 Setup Neon SDK

**lib/db/neon.ts:**
```typescript
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida nas variáveis de ambiente')
}

export const sql = neon(process.env.DATABASE_URL)

// Helper para transações
export async function transaction<T>(
  callback: (sql: typeof neon) => Promise<T>
): Promise<T> {
  // Implementação de transação se necessário
  // Neon SDK gerencia conexões automaticamente
  return callback(sql)
}
```

---

### 5.2 Schema do Banco de Dados

**SQL Initial Schema (migrations/schema.sql):**

```sql
-- Extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Projetos
CREATE TABLE IF NOT EXISTS projetos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Etapas
CREATE TABLE IF NOT EXISTS etapas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  projeto_id UUID NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  ordem INTEGER NOT NULL DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_projeto FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- Índice para melhor performance
CREATE INDEX idx_etapas_projeto_id ON etapas(projeto_id);
CREATE INDEX idx_etapas_ordem ON etapas(projeto_id, ordem);

-- Tabela de Tarefas
CREATE TABLE IF NOT EXISTS tarefas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  etapa_id UUID NOT NULL REFERENCES etapas(id) ON DELETE CASCADE,
  projeto_id UUID NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  ordem INTEGER NOT NULL DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_etapa FOREIGN KEY (etapa_id) REFERENCES etapas(id),
  CONSTRAINT fk_projeto_tarefa FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- Índices para tarefas
CREATE INDEX idx_tarefas_etapa_id ON tarefas(etapa_id);
CREATE INDEX idx_tarefas_projeto_id ON tarefas(projeto_id);
CREATE INDEX idx_tarefas_ordem ON tarefas(etapa_id, ordem);

-- Tabela de Subtarefas
CREATE TABLE IF NOT EXISTS subtarefas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tarefa_id UUID NOT NULL REFERENCES tarefas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  concluida BOOLEAN DEFAULT FALSE,
  ordem INTEGER NOT NULL DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tarefa FOREIGN KEY (tarefa_id) REFERENCES tarefas(id)
);

-- Índices para subtarefas
CREATE INDEX idx_subtarefas_tarefa_id ON subtarefas(tarefa_id);
CREATE INDEX idx_subtarefas_ordem ON subtarefas(tarefa_id, ordem);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_projetos_updated_at BEFORE UPDATE ON projetos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_etapas_updated_at BEFORE UPDATE ON etapas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tarefas_updated_at BEFORE UPDATE ON tarefas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subtarefas_updated_at BEFORE UPDATE ON subtarefas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 6. Padrões de Código

### 6.1 Convenções de Nomenclatura

**Arquivos:**
- Componentes: `PascalCase.tsx` (ex: `TaskCard.tsx`)
- Utilitários: `camelCase.ts` (ex: `validation.ts`)
- Hooks: `use-kebab-case.ts` (ex: `use-drag-drop.ts`)
- Types: `PascalCase.ts` (ex: `types.ts`)

**Variáveis e Funções:**
- `camelCase` para variáveis e funções
- `PascalCase` para componentes e classes
- `UPPER_SNAKE_CASE` para constantes
- `_prefix` para variáveis privadas/métodos

**Componentes:**
```typescript
// Componente de apresentação
export function TaskCard({ task, onEdit }: TaskCardProps) {
  // ...
}

// Componente de container (se necessário)
export function TaskCardContainer({ taskId }: { taskId: string }) {
  // ...
}
```

---

### 6.2 Estrutura de Componentes

**Template de Componente:**
```typescript
'use client' // Se usar hooks/interatividade

import { useState, useEffect } from 'react'
import type { ComponentProps } from './types'

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  // Hooks
  const [isEditing, setIsEditing] = useState(false)

  // Handlers
  const handleEdit = () => {
    setIsEditing(true)
    onEdit?.(task)
  }

  // Render
  return (
    <div className="task-card">
      {/* JSX */}
    </div>
  )
}
```

---

### 6.3 Padrão de API Routes

**Template de API Route:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest } from '@/lib/utils/validation'

// GET - Listar recursos
export async function GET(request: NextRequest) {
  try {
    // Parse query params
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    // Query database
    const results = await sql`
      SELECT * FROM projetos
      WHERE id = ${projectId}
    `

    return NextResponse.json({
      success: true,
      data: results
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'GET_ERROR',
          message: 'Erro ao buscar projetos'
        }
      },
      { status: 500 }
    )
  }
}

// POST - Criar recurso
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar
    const validation = validateRequest(body, projectSchema)
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Dados inválidos',
            details: validation.errors
          }
        },
        { status: 400 }
      )
    }

    // Insert
    const result = await sql`
      INSERT INTO projetos (nome, descricao)
      VALUES (${body.nome}, ${body.descricao})
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      data: result[0]
    }, { status: 201 })
  } catch (error) {
    // Error handling
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: 'Erro ao criar projeto'
        }
      },
      { status: 500 }
    )
  }
}
```

---

### 6.4 Error Handling

**lib/utils/errors.ts:**
```typescript
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
      statusCode: error.statusCode
    }
  }

  // Erro desconhecido
  return {
    code: 'INTERNAL_ERROR',
    message: 'Erro interno do servidor',
    statusCode: 500
  }
}
```

---

## 7. Performance

### 7.1 Otimizações Frontend

**Code Splitting:**
- Lazy loading de componentes pesados
- Dynamic imports para modais e formulários

**Memoization:**
- `useMemo` para cálculos pesados
- `useCallback` para handlers passados como props
- `React.memo` para componentes que renderizam frequentemente

**Virtualization:**
- Para listas longas (>50 itens)
- Biblioteca: `react-window` ou `@tanstack/react-virtual`

---

### 7.2 Otimizações Backend

**Database Queries:**
- Usar índices apropriados
- Evitar N+1 queries (usar JOINs)
- Paginação para listas grandes
- Connection pooling (automático com Neon)

**Caching (Futuro):**
- Cache de queries frequentes
- Redis para sessões (se necessário)

---

## 8. Segurança

### 8.1 Validação de Input

**Frontend:**
- Validação em tempo real
- Feedback visual de erros
- Prevenção de XSS (React faz automaticamente)

**Backend:**
- Validação obrigatória de todos os inputs
- Sanitização de dados
- Prepared statements (SQL injection prevention via Neon SDK)

---

### 8.2 Autenticação (Futuro)

**Estratégia:**
- NextAuth.js ou Auth0
- JWT tokens
- Session management

**Proteção de Rotas:**
- Middleware para proteger API routes
- Verificação de autenticação em todas as rotas

---

## 9. Testes

### 9.1 Estratégia de Testes

**Unit Tests:**
- Utilitários e helpers
- Hooks customizados
- Funções puras

**Integration Tests:**
- API routes
- Database operations

**E2E Tests (Futuro):**
- Playwright ou Cypress
- Fluxos críticos do usuário

---

### 9.2 Ferramentas

**Testing Libraries:**
- Jest para unit tests
- React Testing Library para componentes
- Playwright para E2E (futuro)

---

## 10. Deployment

### 10.1 Ambiente de Produção

**Plataforma Recomendada:**
- Vercel (otimizado para Next.js)
- Alternativas: Netlify, Railway, Render

**Variáveis de Ambiente:**
- Configurar no painel de deployment
- Não commitar `.env.local`

**Database:**
- Neon production branch
- Backups automáticos configurados

---

## 11. Monitoramento (Futuro)

**Ferramentas:**
- Sentry para error tracking
- Vercel Analytics para performance
- Logs estruturados

---

**Fim do Documento**

