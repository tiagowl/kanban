# Guias de Desenvolvimento - Sistema Kanban

## 1. Introdução

Este guia fornece instruções práticas para desenvolvedores trabalharem no sistema Kanban, incluindo setup do ambiente, padrões de código, e workflows de desenvolvimento.

---

## 2. Setup do Ambiente de Desenvolvimento

### 2.1 Pré-requisitos

**Software Necessário:**
- Node.js 18+ (LTS recomendado)
- npm ou yarn ou pnpm
- Git
- Editor de código (VS Code recomendado)
- Conta Neon (para banco de dados)

**Extensões VS Code Recomendadas:**
- ESLint
- Prettier
- TypeScript Hero
- Tailwind CSS IntelliSense
- GitLens

---

### 2.2 Configuração Inicial

**1. Clone o repositório:**
```bash
git clone <repository-url>
cd kanban
```

**2. Instale dependências:**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

**3. Configure variáveis de ambiente:**
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:
```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**4. Configure o banco de dados:**
- Crie um banco no Neon
- Execute o schema SQL (ver `migrations/schema.sql`)

**5. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 3. Estrutura de Pastas

### 3.1 Organização

```
/app                    # Next.js App Router
/components             # Componentes React
/lib                    # Utilitários e configurações
/hooks                  # Custom hooks
/public                 # Arquivos estáticos
/migrations             # SQL migrations
/tests                  # Testes
```

### 3.2 Convenções

**Novos Componentes:**
- Criar em `/components/{categoria}/`
- Usar PascalCase: `TaskCard.tsx`
- Incluir arquivo de tipos se necessário: `TaskCard.types.ts`

**Novas API Routes:**
- Criar em `/app/api/{recurso}/`
- Seguir estrutura RESTful
- Documentar endpoints

---

## 4. Padrões de Código

### 4.1 TypeScript

**Sempre usar tipos:**
```typescript
// ✅ Bom
interface TaskProps {
  task: Task
  onEdit: (task: Task) => void
}

function TaskCard({ task, onEdit }: TaskProps) {
  // ...
}

// ❌ Ruim
function TaskCard({ task, onEdit }: any) {
  // ...
}
```

**Tipos compartilhados:**
- Definir em `/lib/types/index.ts`
- Exportar interfaces/types
- Reutilizar quando possível

---

### 4.2 Componentes React

**Estrutura padrão:**
```typescript
'use client' // Se usar hooks/interatividade

import { useState } from 'react'
import type { ComponentProps } from './types'

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
    onEdit?.(task)
  }

  return (
    <div className="task-card">
      {/* JSX */}
    </div>
  )
}
```

**Regras:**
- Usar `'use client'` apenas quando necessário
- Props sempre tipadas
- Handlers com prefixo `handle`
- JSX limpo e legível

---

### 4.3 API Routes

**Estrutura padrão:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db/neon'
import { validateRequest } from '@/lib/utils/validation'

export async function GET(request: NextRequest) {
  try {
    // 1. Parse params/query
    const { searchParams } = new URL(request.url)
    
    // 2. Validate
    // 3. Query database
    // 4. Return response
    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'ERROR', message: 'Error' } },
      { status: 500 }
    )
  }
}
```

**Sempre:**
- Validar inputs
- Tratar erros
- Retornar formato padrão de resposta
- Usar status codes apropriados

---

### 4.4 Database Queries

**Usar Neon SDK:**
```typescript
import { sql } from '@/lib/db/neon'

// Query simples
const projects = await sql`
  SELECT * FROM projetos
  WHERE id = ${projectId}
`

// Query com JOIN
const tasks = await sql`
  SELECT 
    t.*,
    e.nome as etapa_nome
  FROM tarefas t
  JOIN etapas e ON t.etapa_id = e.id
  WHERE t.projeto_id = ${projectId}
`
```

**Boas práticas:**
- ✅ Sempre usar template strings (previne SQL injection)
- ✅ Não concatenar strings SQL
- ✅ Usar índices para queries frequentes
- ✅ Evitar N+1 queries (usar JOINs)

---

### 4.5 Validação

**Usar Zod:**
```typescript
import { z } from 'zod'

const projectSchema = z.object({
  nome: z.string().min(1).max(255),
  descricao: z.string().optional(),
})

// Validar
const result = projectSchema.safeParse(data)
if (!result.success) {
  return NextResponse.json(
    { success: false, error: { code: 'VALIDATION_ERROR', details: result.error } },
    { status: 400 }
  )
}
```

---

## 5. Workflow de Desenvolvimento

### 5.1 Git Workflow

**Branching Strategy:**
```
main                    # Produção
├── develop            # Desenvolvimento
│   ├── feature/US-001 # Features
│   ├── bugfix/xxx     # Bug fixes
│   └── hotfix/xxx     # Hotfixes
```

**Commits:**
- Formato: `tipo(escopo): descrição`
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Exemplo:**
```bash
feat(kanban): adiciona drag and drop de tarefas
fix(api): corrige validação de projeto
docs(readme): atualiza instruções de setup
```

---

### 5.2 Processo de Desenvolvimento

**1. Criar branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/US-001-criar-projeto
```

**2. Desenvolver:**
- Seguir padrões de código
- Escrever testes se necessário
- Commitar frequentemente

**3. Testar localmente:**
```bash
npm run dev
npm run test  # Se houver testes
```

**4. Criar Pull Request:**
- Descrição clara
- Referenciar issue/user story
- Revisar código próprio antes

**5. Code Review:**
- Revisar PRs de colegas
- Aprovar apenas se estiver bom
- Comentários construtivos

**6. Merge:**
- Após aprovação
- Merge para `develop`
- Deploy automático para staging

---

## 6. Testes

### 6.1 Escrevendo Testes

**Unit Test (Jest):**
```typescript
import { render, screen } from '@testing-library/react'
import { TaskCard } from '@/components/kanban/task-card'

describe('TaskCard', () => {
  it('renderiza título da tarefa', () => {
    const task = { id: '1', titulo: 'Teste' }
    render(<TaskCard task={task} />)
    expect(screen.getByText('Teste')).toBeInTheDocument()
  })
})
```

**API Test:**
```typescript
import { GET } from '@/app/api/projects/route'
import { NextRequest } from 'next/server'

describe('GET /api/projects', () => {
  it('retorna lista de projetos', async () => {
    const request = new NextRequest('http://localhost/api/projects')
    const response = await GET(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(Array.isArray(data.data)).toBe(true)
  })
})
```

---

## 7. Performance

### 7.1 Otimizações Frontend

**Lazy Loading:**
```typescript
import dynamic from 'next/dynamic'

const TaskModal = dynamic(() => import('@/components/tasks/task-modal'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

**Memoization:**
```typescript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])

const handleClick = useCallback(() => {
  // handler
}, [dependencies])
```

**Virtualização:**
- Para listas > 50 itens
- Usar `react-window` ou similar

---

### 7.2 Otimizações Backend

**Queries Eficientes:**
```typescript
// ❌ N+1 Query
const etapas = await sql`SELECT * FROM etapas WHERE projeto_id = ${id}`
for (const etapa of etapas) {
  const tarefas = await sql`SELECT * FROM tarefas WHERE etapa_id = ${etapa.id}`
}

// ✅ Single Query com JOIN
const etapasComTarefas = await sql`
  SELECT 
    e.*,
    json_agg(t.*) as tarefas
  FROM etapas e
  LEFT JOIN tarefas t ON t.etapa_id = e.id
  WHERE e.projeto_id = ${id}
  GROUP BY e.id
`
```

---

## 8. Debugging

### 8.1 Frontend

**React DevTools:**
- Instalar extensão do browser
- Inspecionar componentes e state

**Console Logging:**
```typescript
console.log('Debug:', data) // Remover antes de commit
```

**Error Boundaries:**
```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

---

### 8.2 Backend

**Logging:**
```typescript
console.error('API Error:', error)
// Em produção, usar serviço de logging (ex: Sentry)
```

**Database Queries:**
- Verificar logs do Neon
- Usar EXPLAIN ANALYZE para queries lentas

---

## 9. Troubleshooting Comum

### 9.1 Problemas de Banco de Dados

**Erro de Conexão:**
- Verificar `DATABASE_URL` no `.env.local`
- Verificar credenciais do Neon
- Verificar se banco está ativo

**Queries Lentas:**
- Verificar índices
- Usar EXPLAIN ANALYZE
- Considerar paginação

---

### 9.2 Problemas de Build

**Erros TypeScript:**
```bash
npm run type-check
```

**Erros de Lint:**
```bash
npm run lint
```

**Clear Cache:**
```bash
rm -rf .next
npm run dev
```

---

## 10. Code Review Checklist

### 10.1 Checklist para Revisores

**Código:**
- [ ] Segue padrões de código do projeto
- [ ] Tipos TypeScript corretos
- [ ] Sem código comentado desnecessário
- [ ] Sem console.logs de debug
- [ ] Tratamento de erros adequado

**Funcionalidade:**
- [ ] Atende aos requisitos da user story
- [ ] Não quebra funcionalidades existentes
- [ ] Edge cases tratados

**Performance:**
- [ ] Não há queries N+1
- [ ] Componentes otimizados quando necessário
- [ ] Imagens/assets otimizados

**Segurança:**
- [ ] Inputs validados
- [ ] SQL injection prevenido
- [ ] Dados sensíveis não expostos

**Testes:**
- [ ] Testes escritos (se aplicável)
- [ ] Testes passando

---

## 11. Deploy

### 11.1 Deploy para Staging

**Automático:**
- Merge para `develop` → deploy automático

**Manual:**
```bash
git push origin develop
```

---

### 11.2 Deploy para Produção

**Processo:**
1. Code review aprovado
2. Testes passando
3. Merge para `main`
4. Deploy automático via Vercel
5. Verificar health check
6. Monitorar logs

**Rollback:**
- Usar interface do Vercel
- Ou revert commit e redeploy

---

## 12. Documentação

### 12.1 Documentando Código

**JSDoc para funções complexas:**
```typescript
/**
 * Move uma tarefa para nova posição ou etapa
 * @param taskId - ID da tarefa
 * @param newStageId - ID da nova etapa (opcional)
 * @param newOrder - Nova ordem na lista
 * @returns Tarefa atualizada
 */
export async function moveTask(
  taskId: string,
  newStageId?: string,
  newOrder: number
): Promise<Task> {
  // ...
}
```

**Comentários:**
- ✅ Explicar "por quê", não "o quê"
- ✅ Comentar lógica complexa
- ❌ Não comentar código óbvio

---

## 13. Recursos Úteis

### 13.1 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Neon Docs](https://neon.tech/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### 13.2 Ferramentas

- **Postman/Insomnia:** Testar APIs
- **DBeaver/TablePlus:** Visualizar banco
- **React DevTools:** Debug React
- **Lighthouse:** Performance audit

---

## 14. FAQ

**P: Como adicionar nova feature?**
R: Criar branch `feature/US-XXX`, desenvolver, testar, criar PR, aguardar review.

**P: Onde colocar novos componentes?**
R: Em `/components/{categoria}/`. Se não existe categoria, criar.

**P: Como testar API localmente?**
R: Usar Postman/Insomnia ou `curl` apontando para `http://localhost:3000/api/...`

**P: Erro de conexão com banco?**
R: Verificar `.env.local`, credenciais Neon, e se banco está ativo.

---

**Fim do Documento**

