# Diagramas de Arquitetura - Sistema Kanban

## Visão Geral

Este documento contém os diagramas de arquitetura do Sistema Kanban, mostrando a estrutura geral do sistema, componentes principais, fluxo de dados e integrações.

---

## 1. Arquitetura Geral do Sistema

### Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Next.js Frontend (React)                      │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │   Pages      │  │  Components  │  │    Hooks   │  │  │
│  │  │  (App Router)│  │ (Shadcn UI)  │  │  (Custom)  │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/HTTPS
                        │ REST API
┌───────────────────────┴─────────────────────────────────────┐
│                   SERVIDOR (Next.js)                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         API Routes (Server Components)                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │  /api/auth   │  │ /api/projects│  │/api/tasks  │  │  │
│  │  │  /api/stages │  │ /api/labels  │  │/api/subtasks│ │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  └───────────────────────┬───────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────┴───────────────────────────────┐  │
│  │              Prisma ORM                               │  │
│  │  ┌──────────────────────────────────────────────┐     │  │
│  │  │         Prisma Client                        │     │  │
│  │  │  - Type-safe database access                 │     │  │
│  │  │  - Query optimization                        │     │  │
│  │  │  - Migrations                                │     │  │
│  │  └──────────────────────────────────────────────┘     │  │
│  └───────────────────────┬───────────────────────────────┘  │
└──────────────────────────┼───────────────────────────────────┘
                           │ PostgreSQL Protocol
┌──────────────────────────┴───────────────────────────────────┐
│              BANCO DE DADOS (Neon PostgreSQL)                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  - Users                                              │  │
│  │  - Projects                                           │  │
│  │  - Stages                                             │  │
│  │  - Tasks                                              │  │
│  │  - Subtasks                                           │  │
│  │  - Labels                                             │  │
│  │  - TaskLabels (Many-to-Many)                          │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Componentes Principais

1. **Frontend (Next.js)**
   - Pages: Páginas da aplicação (App Router)
   - Components: Componentes React reutilizáveis
   - Hooks: Lógica reutilizável de estado e efeitos
   - Utils: Funções utilitárias

2. **Backend (Next.js API Routes)**
   - API Routes: Endpoints REST
   - Middleware: Autenticação, validação
   - Services: Lógica de negócio
   - Prisma Client: Acesso ao banco

3. **Banco de Dados (Neon PostgreSQL)**
   - Tabelas relacionais
   - Índices para performance
   - Constraints para integridade

---

## 2. Arquitetura de Camadas

### Diagrama de Camadas

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages, Components, Hooks                            │   │
│  │  - Renderização de UI                                │   │
│  │  - Gerenciamento de estado local                     │   │
│  │  - Interações do usuário                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ (API Calls)
┌─────────────────────────────────────────────────────────────┐
│                      CAMADA DE API                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Routes, Middleware                              │   │
│  │  - Validação de requests                             │   │
│  │  - Autenticação e autorização                        │   │
│  │  - Tratamento de erros                               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ (Service Calls)
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE SERVIÇOS                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic, Services                            │   │
│  │  - Regras de negócio                                 │   │
│  │  - Validações de domínio                             │   │
│  │  - Transformações de dados                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ (Database Queries)
┌─────────────────────────────────────────────────────────────┐
│                   CAMADA DE DADOS                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Prisma ORM, Database                                │   │
│  │  - Acesso ao banco de dados                          │   │
│  │  - Queries otimizadas                                │   │
│  │  - Transações                                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Responsabilidades por Camada

**Camada de Apresentação:**
- Renderizar UI baseada em estado
- Capturar interações do usuário
- Fazer requisições HTTP para API
- Gerenciar estado local (formulários, UI)

**Camada de API:**
- Receber e validar requisições HTTP
- Autenticar e autorizar usuários
- Chamar serviços apropriados
- Retornar respostas formatadas

**Camada de Serviços:**
- Implementar lógica de negócio
- Validar regras de domínio
- Orquestrar operações complexas
- Transformar dados entre camadas

**Camada de Dados:**
- Persistir e recuperar dados
- Otimizar queries
- Gerenciar transações
- Manter integridade referencial

---

## 3. Modelo de Dados (Schema)

### Diagrama ER (Entidade-Relacionamento)

```
┌──────────────┐
│    User      │
├──────────────┤
│ id           │──┐
│ email        │  │
│ password     │  │
│ name         │  │
│ createdAt    │  │
│ updatedAt    │  │
└──────────────┘  │
                  │ 1:N
┌──────────────┐  │
│   Project    │◄─┘
├──────────────┤
│ id           │──┐
│ userId       │  │
│ name         │  │ 1:N
│ description  │  │
│ createdAt    │  │
│ updatedAt    │  │
└──────────────┘  │
                  │
┌──────────────┐  │
│    Stage     │◄─┘
├──────────────┤
│ id           │──┐
│ projectId    │  │
│ name         │  │ 1:N
│ order        │  │
│ createdAt    │  │
│ updatedAt    │  │
└──────────────┘  │
                  │
┌──────────────┐  │
│    Task      │◄─┘
├──────────────┤
│ id           │──┐
│ stageId      │  │
│ title        │  │ 1:N
│ description  │  │
│ order        │  │
│ createdAt    │  │
│ updatedAt    │  │
└──────────────┘  │
                  │
┌──────────────┐  │
│   Subtask    │◄─┘
├──────────────┤
│ id           │
│ taskId       │
│ title        │
│ completed    │
│ order        │
│ createdAt    │
│ updatedAt    │
└──────────────┘

┌──────────────┐
│    Label     │
├──────────────┤
│ id           │──┐
│ projectId    │  │      ┌──────────────┐
│ name         │  │      │  TaskLabel   │
│ color        │  │      ├──────────────┤
│ createdAt    │  │ N:M  │ id           │
│ updatedAt    │◄─┼─────▶│ taskId       │
└──────────────┘  │      │ labelId      │
                  │      │ createdAt    │
                  └──────┴──────────────┘
```

### Relacionamentos

1. **User → Project** (1:N)
   - Um usuário pode ter muitos projetos
   - Um projeto pertence a um usuário

2. **Project → Stage** (1:N)
   - Um projeto pode ter muitas etapas
   - Uma etapa pertence a um projeto

3. **Stage → Task** (1:N)
   - Uma etapa pode ter muitas tarefas
   - Uma tarefa pertence a uma etapa

4. **Task → Subtask** (1:N)
   - Uma tarefa pode ter muitas sub-tarefas
   - Uma sub-tarefa pertence a uma tarefa

5. **Project → Label** (1:N)
   - Um projeto pode ter muitas etiquetas
   - Uma etiqueta pertence a um projeto

6. **Task ↔ Label** (N:M)
   - Uma tarefa pode ter muitas etiquetas
   - Uma etiqueta pode estar em muitas tarefas
   - Relação através de TaskLabel (tabela pivot)

---

## 4. Fluxo de Dados - Autenticação

### Diagrama de Sequência

```
User          Frontend         API Route        Service      Database
 │                │                │               │            │
 │  Login         │                │               │            │
 │───────────────>│                │               │            │
 │                │  POST /api/auth/login         │            │
 │                │──────────────────────────────>│            │
 │                │                │  validateUser()            │
 │                │                │──────────────>│            │
 │                │                │               │  SELECT   │
 │                │                │               │──────────>│
 │                │                │               │  User     │
 │                │                │               │<──────────│
 │                │                │  checkPassword()           │
 │                │                │<──────────────│            │
 │                │  JWT Token     │               │            │
 │                │<───────────────────────────────│            │
 │  Redirect      │                │               │            │
 │<───────────────│                │               │            │
```

### Fluxo de Autenticação

1. Usuário preenche formulário de login
2. Frontend envia credenciais para `/api/auth/login`
3. API valida credenciais com Service
4. Service consulta banco de dados
5. Service verifica senha (hash)
6. API gera JWT token
7. Frontend armazena token (localStorage/cookie)
8. Frontend redireciona para dashboard

---

## 5. Fluxo de Dados - Criação de Tarefa

### Diagrama de Sequência

```
User          Frontend         API Route        Service      Database
 │                │                │               │            │
 │  Create Task   │                │               │            │
 │───────────────>│                │               │            │
 │                │  POST /api/tasks               │            │
 │                │  { title, stageId }            │            │
 │                │──────────────────────────────>│            │
 │                │                │  validateAuth()            │
 │                │                │──────────────>│            │
 │                │                │  createTask() │            │
 │                │                │──────────────>│            │
 │                │                │               │  INSERT   │
 │                │                │               │──────────>│
 │                │                │               │  Task     │
 │                │                │               │<──────────│
 │                │  Task Data     │               │            │
 │                │<───────────────────────────────│            │
 │  Update UI     │                │               │            │
 │<───────────────│                │               │            │
```

### Fluxo de Criação

1. Usuário preenche formulário de tarefa
2. Frontend valida dados localmente
3. Frontend envia POST para `/api/tasks`
4. API valida autenticação (JWT)
5. API valida dados (schema)
6. Service verifica permissões (projeto do usuário)
7. Service cria tarefa no banco
8. Database retorna tarefa criada
9. API retorna tarefa ao frontend
10. Frontend atualiza UI (otimistic update)

---

## 6. Fluxo de Dados - Drag and Drop

### Diagrama de Sequência

```
User          Frontend         API Route        Service      Database
 │                │                │               │            │
 │  Drag Task     │                │               │            │
 │───────────────>│                │               │            │
 │  Drop Task     │                │               │            │
 │───────────────>│                │               │            │
 │                │  Optimistic Update            │            │
 │  UI Updated    │                │               │            │
 │<───────────────│                │               │            │
 │                │  PATCH /api/tasks/:id         │            │
 │                │  { stageId, order }           │            │
 │                │──────────────────────────────>│            │
 │                │                │  moveTask()  │            │
 │                │                │──────────────>│            │
 │                │                │               │  UPDATE   │
 │                │                │               │──────────>│
 │                │                │               │  Task     │
 │                │                │               │<──────────│
 │                │  Success       │               │            │
 │                │<───────────────────────────────│            │
 │  Toast         │                │               │            │
 │<───────────────│                │               │            │
```

### Características Especiais

**Optimistic Updates:**
- Frontend atualiza UI imediatamente
- Não espera resposta do servidor
- Melhora percepção de performance
- Reverte em caso de erro

**Transação de Movimentação:**
- Atualiza `stageId` da tarefa
- Atualiza `order` na nova etapa
- Reordena tarefas na etapa original (se necessário)
- Garante consistência

---

## 7. Arquitetura de Componentes Frontend

### Estrutura de Componentes

```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (dashboard)/
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── kanban/
│   └── layout.tsx
├── api/
│   ├── auth/
│   │   └── route.ts
│   ├── projects/
│   │   └── route.ts
│   ├── stages/
│   │   └── route.ts
│   └── tasks/
│       └── route.ts
└── layout.tsx

components/
├── ui/              # Shadcn UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── kanban/
│   ├── KanbanBoard.tsx
│   ├── KanbanColumn.tsx
│   └── TaskCard.tsx
├── tasks/
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   └── TaskForm.tsx
├── projects/
│   ├── ProjectCard.tsx
│   └── ProjectForm.tsx
└── layout/
    ├── Header.tsx
    ├── Sidebar.tsx
    └── Footer.tsx

lib/
├── prisma.ts        # Prisma Client singleton
├── auth.ts          # Auth utilities
├── api.ts           # API client
└── utils.ts         # Utility functions

hooks/
├── useAuth.ts
├── useProjects.ts
├── useTasks.ts
└── useKanban.ts
```

### Responsabilidades dos Componentes

**Pages (App Router):**
- Roteamento e layout principal
- Carregamento de dados (Server Components)
- Composição de componentes

**Components:**
- `ui/`: Componentes base do Shadcn UI
- `kanban/`: Componentes específicos do Kanban
- `tasks/`: Componentes relacionados a tarefas
- `projects/`: Componentes de projetos
- `layout/`: Componentes de layout

**Hooks:**
- `useAuth`: Gerenciamento de autenticação
- `useProjects`: Lógica de projetos
- `useTasks`: Lógica de tarefas
- `useKanban`: Estado e lógica do Kanban

**Lib:**
- `prisma.ts`: Instância do Prisma Client
- `auth.ts`: Helpers de autenticação
- `api.ts`: Cliente HTTP para API
- `utils.ts`: Funções utilitárias

---

## 8. Arquitetura de API

### Estrutura de Rotas

```
/api
├── auth/
│   ├── login/
│   │   └── route.ts        POST   - Login
│   ├── register/
│   │   └── route.ts        POST   - Registro
│   └── logout/
│       └── route.ts        POST   - Logout
│
├── projects/
│   ├── route.ts            GET    - Listar projetos
│   │                       POST   - Criar projeto
│   └── [id]/
│       ├── route.ts        GET    - Obter projeto
│       │                   PATCH  - Atualizar projeto
│       │                   DELETE - Excluir projeto
│       └── stages/
│           └── route.ts    GET    - Listar etapas
│                           POST   - Criar etapa
│
├── stages/
│   ├── route.ts            GET    - Listar etapas (filtrado)
│   └── [id]/
│       ├── route.ts        GET    - Obter etapa
│       │                   PATCH  - Atualizar etapa
│       │                   DELETE - Excluir etapa
│       └── tasks/
│           └── route.ts    GET    - Listar tarefas
│                           POST   - Criar tarefa
│
├── tasks/
│   ├── route.ts            GET    - Listar tarefas (filtrado)
│   └── [id]/
│       ├── route.ts        GET    - Obter tarefa
│       │                   PATCH  - Atualizar tarefa
│       │                   DELETE - Excluir tarefa
│       ├── move/
│       │   └── route.ts    POST   - Mover tarefa
│       └── subtasks/
│           └── route.ts    GET    - Listar sub-tarefas
│                           POST   - Criar sub-tarefa
│
├── subtasks/
│   └── [id]/
│       └── route.ts        GET    - Obter sub-tarefa
│                           PATCH  - Atualizar sub-tarefa
│                           DELETE - Excluir sub-tarefa
│
└── labels/
    ├── route.ts            GET    - Listar etiquetas
    │                       POST   - Criar etiqueta
    └── [id]/
        └── route.ts        GET    - Obter etiqueta
                            PATCH  - Atualizar etiqueta
                            DELETE - Excluir etiqueta
```

### Padrões de Resposta

**Sucesso:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Erro:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem de erro"
  }
}
```

**Paginação:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## 9. Segurança e Autenticação

### Arquitetura de Segurança

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  JWT Token (localStorage ou HttpOnly Cookie)        │   │
│  │  - Armazenamento seguro                             │   │
│  │  - Enviado em header: Authorization: Bearer <token> │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Auth Middleware                                     │   │
│  │  - Valida JWT token                                  │   │
│  │  - Extrai userId                                     │   │
│  │  - Verifica expiração                                │   │
│  │  - Adiciona user ao request                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      API ROUTE                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  - Acessa req.user (adicionado pelo middleware)      │   │
│  │  - Valida permissões (ownership)                     │   │
│  │  - Processa request                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Medidas de Segurança

1. **Autenticação:**
   - JWT tokens com expiração
   - Senhas hasheadas (bcrypt)
   - Refresh tokens (futuro)

2. **Autorização:**
   - Middleware verifica ownership
   - Validação em cada endpoint
   - Princípio do menor privilégio

3. **Validação:**
   - Validação de input (Zod)
   - Sanitização de dados
   - Proteção contra SQL Injection (Prisma)

4. **HTTPS:**
   - Todas as comunicações via HTTPS
   - Cookies HttpOnly e Secure

---

## 10. Performance e Otimizações

### Estratégias de Performance

**Frontend:**
- Server Components (Next.js)
- Code splitting automático
- Lazy loading de componentes
- Virtualização de listas longas
- Debounce/throttle em inputs

**Backend:**
- Queries otimizadas (Prisma)
- Índices no banco de dados
- Paginação em listas
- Cache de queries frequentes (futuro)
- Compression (gzip)

**Database:**
- Índices em foreign keys
- Índices em campos de busca
- Connection pooling
- Query optimization

### Otimizações Específicas

**Drag and Drop:**
- Optimistic updates
- Debounce de requisições
- Batch de updates (futuro)

**Listas Grandes:**
- Virtualização (react-window)
- Paginação infinita
- Lazy loading

**Queries:**
- Select apenas campos necessários
- Includes otimizados (Prisma)
- Evitar N+1 queries

---

## 11. Escalabilidade

### Estratégias de Escala

**Horizontal Scaling:**
- Next.js stateless (pode ter múltiplas instâncias)
- Load balancer (futuro)
- Database read replicas (futuro)

**Vertical Scaling:**
- Aumentar recursos do servidor
- Database com mais recursos

**Cache:**
- Redis para cache (futuro)
- Cache de queries frequentes
- CDN para assets estáticos

**Database:**
- Índices bem definidos
- Particionamento (se necessário)
- Read replicas

---

## 12. Monitoramento e Observabilidade

### Métricas a Monitorar

**Performance:**
- Tempo de resposta das APIs
- Time to First Byte (TTFB)
- Largest Contentful Paint (LCP)
- First Contentful Paint (FCP)

**Erros:**
- Taxa de erros
- Logs de erros
- Stack traces

**Uso:**
- Requisições por segundo
- Usuários ativos
- Features mais usadas

### Ferramentas Sugeridas

- **Logs**: Console.log, Winston (futuro)
- **Errors**: Sentry (futuro)
- **Analytics**: Vercel Analytics, Google Analytics
- **Performance**: Lighthouse, Web Vitals

---

## 13. Deploy e Infraestrutura

### Arquitetura de Deploy

```
┌─────────────────────────────────────────────────────────────┐
│                    CDN / Vercel Edge                        │
│  - Assets estáticos                                         │
│  - Cache de páginas                                         │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              Vercel / Next.js Server                        │
│  - Next.js App                                              │
│  - API Routes                                               │
│  - Server Components                                        │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              Neon PostgreSQL Database                       │
│  - Database principal                                       │
│  - Backups automáticos                                      │
└─────────────────────────────────────────────────────────────┘
```

### Ambiente de Deploy

**Produção:**
- Hosting: Vercel (recomendado) ou similar
- Database: Neon (PostgreSQL)
- Domínio: Configurado via Vercel
- HTTPS: Automático via Vercel

**Desenvolvimento:**
- Local: `npm run dev`
- Database: Neon (dev branch) ou local

**Staging:**
- Branch separado no Neon
- Preview deployments (Vercel)

---

## 14. Integrações Futuras

### Possíveis Integrações

**Autenticação Externa:**
- OAuth (Google, GitHub)
- SSO

**Notificações:**
- Email (SendGrid, Resend)
- Push notifications (futuro)

**Storage:**
- S3 para arquivos (futuro)
- Imagens de perfil

**Analytics:**
- Mixpanel, Amplitude
- Tracking de eventos

---

## 15. Diagramas de Sequência Detalhados

### Operação Completa: Mover Tarefa Entre Etapas

```
Client          API            Service          Prisma         Database
  │              │                │                │               │
  │  Drag Task   │                │                │               │
  │─────────────>│                │                │               │
  │  Drop Task   │                │                │               │
  │─────────────>│                │                │               │
  │              │  PATCH /tasks/:id {stageId, order}             │
  │              │───────────────────────────────────────────────>│
  │              │                │  validateAuth()                │
  │              │                │<───────────────────────────────│
  │              │                │  validateOwnership()            │
  │              │                │───────────────────────────────>│
  │              │                │                │  SELECT Task  │
  │              │                │                │──────────────>│
  │              │                │                │<──────────────│
  │              │                │  moveTask()                    │
  │              │                │───────────────────────────────>│
  │              │                │                │  BEGIN TRANS  │
  │              │                │                │──────────────>│
  │              │                │                │  UPDATE Task  │
  │              │                │                │──────────────>│
  │              │                │                │  UPDATE Orders│
  │              │                │                │──────────────>│
  │              │                │                │  COMMIT       │
  │              │                │                │<──────────────│
  │              │  Success {task}│                │               │
  │              │<───────────────────────────────────────────────│
  │  Toast       │                │                │               │
  │<─────────────│                │                │               │
```

---

## 16. Resumo Arquitetural

### Princípios Seguidos

1. **Separation of Concerns**
   - Camadas bem definidas
   - Responsabilidades claras

2. **Type Safety**
   - TypeScript em todo código
   - Prisma garante tipos do banco

3. **Security First**
   - Autenticação em todas as rotas
   - Validação rigorosa
   - Proteção contra SQL Injection

4. **Performance**
   - Otimizações em todas as camadas
   - Lazy loading
   - Caching quando apropriado

5. **Scalability**
   - Stateless design
   - Horizontal scaling ready
   - Database otimizada

### Decisões Arquiteturais Principais

- **Next.js App Router**: Moderno, Server Components
- **Prisma ORM**: Type-safe, migrations
- **PostgreSQL (Neon)**: Relacional, escalável
- **Shadcn UI**: Componentes acessíveis, customizáveis
- **JWT Authentication**: Stateless, escalável

---

## Conclusão

Esta arquitetura fornece uma base sólida, escalável e segura para o Sistema Kanban. Ela é projetada para crescer com o produto, mantendo performance e manutenibilidade.

**Próximos Passos:**
1. Implementar estrutura de pastas
2. Configurar Prisma schema
3. Criar API routes base
4. Implementar autenticação
5. Desenvolver componentes principais

