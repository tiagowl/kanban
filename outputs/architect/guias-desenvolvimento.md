# Guias de Desenvolvimento - Sistema Kanban

## Visão Geral

Este documento contém guias práticos para desenvolvedores trabalhando no Sistema Kanban, incluindo setup do ambiente, fluxo de trabalho, convenções de código e boas práticas.

---

## 1. Setup do Ambiente de Desenvolvimento

### Pré-requisitos

**Software Necessário:**
- **Node.js**: 18.0.0 ou superior (LTS recomendado)
- **npm** ou **yarn**: Gerenciador de pacotes
- **Git**: Controle de versão
- **VS Code** (recomendado): Editor com extensões

**Extensões VS Code Recomendadas:**
- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Configuração Inicial

**1. Clonar Repositório:**
```bash
git clone <repository-url>
cd kanban-system
```

**2. Instalar Dependências:**
```bash
npm install
```

**3. Configurar Variáveis de Ambiente:**
```bash
cp .env.example .env
# Editar .env com suas credenciais
```

**4. Configurar Banco de Dados:**
```bash
# Gerar Prisma Client
npm run db:generate

# Executar migrations
npm run db:migrate

# (Opcional) Popular banco com dados de teste
npm run db:seed
```

**5. Iniciar Servidor de Desenvolvimento:**
```bash
npm run dev
```

Acesse `http://localhost:3000`

---

## 2. Fluxo de Trabalho com Git

### Branching Strategy

**Estrutura de Branches:**
- `main`: Produção (sempre estável)
- `develop`: Desenvolvimento (integração)
- `feature/*`: Novas funcionalidades
- `bugfix/*`: Correções de bugs
- `hotfix/*`: Correções urgentes

**Exemplos:**
- `feature/US-010-criar-tarefa`
- `bugfix/drag-drop-mobile`
- `hotfix/auth-token-expiry`

### Commit Messages

**Formato:**
```
<tipo>: <descrição curta>

<descrição detalhada (opcional)>

<referências (opcional)>
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção

**Exemplos:**
```
feat: adicionar drag and drop de tarefas

Implementa funcionalidade de mover tarefas entre etapas
usando @dnd-kit.

Ref: US-014, US-015
```

```
fix: corrigir validação de email no formulário de registro

A validação não estava verificando formato correto de email.
Adicionado regex mais robusto.

Fixes #123
```

### Pull Requests

**Processo:**
1. Criar branch a partir de `develop`
2. Desenvolver feature/correção
3. Commitar mudanças
4. Push para repositório remoto
5. Criar Pull Request
6. Code review
7. Merge após aprovação

**Template de PR:**
```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bugfix
- [ ] Feature
- [ ] Refactor
- [ ] Documentação

## Checklist
- [ ] Código testado localmente
- [ ] Testes passando
- [ ] Sem erros de lint
- [ ] Documentação atualizada
- [ ] Screenshots (se UI mudou)

## Referências
Closes #issue
```

---

## 3. Convenções de Código

### TypeScript

**Tipos:**
```typescript
// ✅ BOM: Tipos explícitos
interface Task {
  id: string
  title: string
  completed: boolean
}

function createTask(task: Task): Promise<Task> {
  // ...
}

// ❌ RUIM: any
function createTask(task: any): any {
  // ...
}
```

**Interfaces vs Types:**
- Usar `interface` para objetos/extensões
- Usar `type` para unions, intersections, primitivos

```typescript
// Interface para objetos
interface User {
  id: string
  name: string
}

// Type para unions
type Status = 'pending' | 'completed' | 'cancelled'
```

### React Components

**Componentes Function:**
```typescript
// ✅ BOM: Componente funcional com TypeScript
interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
    </div>
  )
}
```

**Hooks:**
```typescript
// ✅ BOM: Custom hook
export function useTasks(projectId: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  // ...
  return { tasks, loading, error }
}

// Uso
const { tasks, loading } = useTasks(projectId)
```

**Event Handlers:**
```typescript
// ✅ BOM: Nomear handlers com "handle"
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // ...
}

// ✅ BOM: Usar useCallback para handlers passados como props
const handleClick = useCallback(() => {
  // ...
}, [dependencies])
```

### Naming Conventions

**Variáveis e Funções:**
```typescript
// camelCase
const taskTitle = 'My Task'
const getTasks = () => {}

// Boolean: prefixo "is", "has", "should"
const isLoading = true
const hasError = false
const shouldRender = true
```

**Componentes:**
```typescript
// PascalCase
export function TaskCard() {}
export function KanbanBoard() {}
```

**Constants:**
```typescript
// UPPER_SNAKE_CASE
const MAX_TASKS_PER_STAGE = 100
const API_BASE_URL = 'https://api.example.com'
```

**Types/Interfaces:**
```typescript
// PascalCase
interface Task {}
type ProjectStatus = 'active' | 'archived'
```

---

## 4. Estrutura de Arquivos

### Organização de Componentes

**Componente Simples:**
```
components/
  tasks/
    TaskCard.tsx
```

**Componente com Subcomponentes:**
```
components/
  kanban/
    KanbanBoard.tsx
    KanbanColumn.tsx
    TaskCard.tsx
    index.ts          # Exports
```

**Componente com Utils:**
```
components/
  tasks/
    TaskCard.tsx
    TaskCard.utils.ts
    TaskCard.types.ts
```

### Estrutura de API Routes

```
app/
  api/
    tasks/
      route.ts           # GET, POST
      [id]/
        route.ts         # GET, PATCH, DELETE
        move/
          route.ts       # POST (mover tarefa)
```

---

## 5. Padrões de Código

### Error Handling

**API Routes:**
```typescript
export async function GET(request: NextRequest) {
  try {
    // Lógica
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error:', error)
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

**Frontend:**
```typescript
try {
  const task = await api.post('/tasks', data)
  toast.success('Tarefa criada!')
  return task
} catch (error) {
  if (error instanceof ApiError) {
    toast.error(error.message)
  } else {
    toast.error('Erro inesperado')
  }
  throw error
}
```

### Async/Await

**✅ BOM:**
```typescript
async function fetchTasks() {
  const tasks = await api.get('/tasks')
  return tasks
}
```

**❌ RUIM:**
```typescript
function fetchTasks() {
  return api.get('/tasks').then(tasks => tasks)
}
```

### Null Safety

**✅ BOM:**
```typescript
const task = await prisma.task.findUnique({ where: { id } })
if (!task) {
  throw new Error('Task not found')
}
// task é garantidamente não-null aqui
```

**✅ BOM: Optional Chaining**
```typescript
const stageName = task?.stage?.name ?? 'Unknown'
```

---

## 6. Prisma Best Practices

### Queries Otimizadas

**✅ BOM: Select apenas campos necessários**
```typescript
const tasks = await prisma.task.findMany({
  select: {
    id: true,
    title: true,
    stage: {
      select: {
        id: true,
        name: true,
      },
    },
  },
})
```

**✅ BOM: Includes quando necessário**
```typescript
const task = await prisma.task.findUnique({
  where: { id },
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
```

**❌ RUIM: N+1 Queries**
```typescript
// ❌ RUIM
const tasks = await prisma.task.findMany()
for (const task of tasks) {
  const stage = await prisma.stage.findUnique({ where: { id: task.stageId } })
}

// ✅ BOM
const tasks = await prisma.task.findMany({
  include: {
    stage: true,
  },
})
```

### Transações

**✅ BOM: Usar transações para operações relacionadas**
```typescript
await prisma.$transaction(async (tx) => {
  // Criar tarefa
  const task = await tx.task.create({ data: taskData })
  
  // Criar sub-tarefas
  await tx.subtask.createMany({
    data: subtasks.map(s => ({ ...s, taskId: task.id })),
  })
  
  return task
})
```

---

## 7. Testes

### Estrutura de Testes

```
__tests__/
  unit/
    services/
      taskService.test.ts
  integration/
    api/
      tasks.test.ts
  e2e/
    login.spec.ts
```

### Exemplo de Teste Unitário

```typescript
import { describe, it, expect } from 'vitest'
import { createTask } from '@/services/taskService'

describe('taskService', () => {
  it('should create a task', async () => {
    const taskData = {
      title: 'Test Task',
      stageId: 'stage-1',
    }
    
    const task = await createTask(taskData, 'user-1')
    
    expect(task).toBeDefined()
    expect(task.title).toBe('Test Task')
  })
})
```

### Exemplo de Teste de API

```typescript
import { describe, it, expect } from 'vitest'
import { createMocks } from 'node-mocks-http'

describe('POST /api/tasks', () => {
  it('should create a task', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'Test Task',
        stageId: 'stage-1',
      },
    })
    
    await POST(req)
    
    expect(res._getStatusCode()).toBe(201)
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
  })
})
```

---

## 8. Performance

### Otimizações Frontend

**Lazy Loading:**
```typescript
// ✅ BOM: Lazy load de componentes pesados
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

**Memoização:**
```typescript
// ✅ BOM: Memoizar componentes pesados
const TaskCard = memo(({ task }: TaskCardProps) => {
  // ...
}, (prev, next) => prev.task.id === next.task.id)
```

**Debounce:**
```typescript
// ✅ BOM: Debounce em inputs
const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    // Buscar
  }, 300),
  []
)
```

### Otimizações Backend

**Índices no Banco:**
```prisma
model Task {
  // ...
  
  @@index([stageId])
  @@index([stageId, order])
}
```

**Pagination:**
```typescript
const tasks = await prisma.task.findMany({
  take: 20,
  skip: (page - 1) * 20,
})
```

---

## 9. Segurança

### Validação de Input

**✅ SEMPRE validar no backend:**
```typescript
export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Validar com Zod
  const validated = taskSchema.parse(body)
  
  // Processar apenas dados validados
}
```

### Autenticação

**✅ SEMPRE verificar autenticação:**
```typescript
export async function GET(request: NextRequest) {
  const user = await validateAuth(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Processar apenas se autenticado
}
```

### Autorização

**✅ SEMPRE verificar ownership:**
```typescript
const task = await prisma.task.findFirst({
  where: {
    id: taskId,
    stage: {
      project: {
        userId: user.id, // Verificar ownership
      },
    },
  },
})

if (!task) {
  throw new Error('Task not found or unauthorized')
}
```

---

## 10. Debugging

### Logs

**Estrutura de Logs:**
```typescript
// ✅ BOM: Logs estruturados
console.log('[API] Creating task:', { taskId, stageId, userId })
console.error('[API] Error creating task:', { error, taskId })
```

**Níveis:**
- `console.log`: Info geral
- `console.warn`: Avisos
- `console.error`: Erros
- `console.debug`: Debug (apenas em dev)

### Debugging Frontend

**React DevTools:**
- Instalar extensão do navegador
- Inspecionar componentes, props, state

**Network Tab:**
- Verificar requisições HTTP
- Ver payloads e respostas

### Debugging Backend

**Prisma Studio:**
```bash
npm run db:studio
```
- Interface visual para banco de dados
- Ver e editar dados

**Console Logs:**
- Adicionar logs em pontos críticos
- Usar `console.time()` e `console.timeEnd()` para performance

---

## 11. Troubleshooting

### Problemas Comuns

**Erro: "Module not found"**
- Verificar imports (paths relativos vs absolutos)
- Rodar `npm install` novamente
- Verificar `tsconfig.json` paths

**Erro: "Prisma Client not generated"**
- Rodar `npm run db:generate`
- Verificar `schema.prisma` está correto

**Erro: "Database connection failed"**
- Verificar `DATABASE_URL` no `.env`
- Verificar se Neon está acessível
- Verificar credenciais

**Erro: "JWT token invalid"**
- Verificar `JWT_SECRET` no `.env`
- Verificar token não expirou
- Limpar localStorage e fazer login novamente

---

## 12. Code Review Checklist

### Checklist para Revisores

**Funcionalidade:**
- [ ] Código implementa o que foi solicitado
- [ ] Não há bugs óbvios
- [ ] Edge cases foram considerados

**Código:**
- [ ] Código segue convenções
- [ ] Não há código comentado desnecessário
- [ ] Nomes são descritivos
- [ ] Funções são pequenas e focadas

**Performance:**
- [ ] Queries são otimizadas
- [ ] Não há N+1 queries
- [ ] Componentes são otimizados (se aplicável)

**Segurança:**
- [ ] Inputs são validados
- [ ] Autenticação verificada
- [ ] Autorização verificada
- [ ] Não há informações sensíveis expostas

**Testes:**
- [ ] Testes passando
- [ ] Cobertura adequada (se aplicável)

**Documentação:**
- [ ] Comentários quando necessário
- [ ] README atualizado (se mudanças significativas)

---

## 13. Releases

### Processo de Release

**1. Preparação:**
- Merge de todas as features para `develop`
- Rodar testes completos
- Verificar changelog

**2. Release:**
- Criar branch `release/v1.0.0` de `develop`
- Testes finais
- Merge para `main`
- Tag: `git tag v1.0.0`

**3. Deploy:**
- Deploy automático via Vercel (se configurado)
- Ou deploy manual
- Verificar em produção

**4. Hotfix:**
- Criar branch `hotfix/issue-description` de `main`
- Fix
- Teste
- Merge para `main` e `develop`

---

## 14. Recursos e Referências

### Documentação Oficial

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Shadcn UI](https://ui.shadcn.com)

### Ferramentas Úteis

- **Prisma Studio**: `npm run db:studio`
- **ESLint**: `npm run lint`
- **Type Check**: `npm run type-check`

### Comunidade

- Discord da equipe (se houver)
- Issues do GitHub
- Documentação interna

---

## Conclusão

Este guia fornece as bases para desenvolvimento consistente e eficiente no Sistema Kanban. Sempre que houver dúvidas, consulte este documento ou peça ajuda à equipe.

**Lembre-se:**
- Código limpo é melhor que código inteligente
- Testes são investimento, não custo
- Code review é aprendizado mútuo
- Documentação ajuda você e sua equipe

**Atualizações:** Este guia deve ser atualizado conforme o projeto evolui e novos padrões são estabelecidos.






