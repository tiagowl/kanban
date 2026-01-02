# Diagramas de Arquitetura - Sistema Kanban

## 1. Visão Geral do Sistema

### 1.1 Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Next.js Frontend (React)                    │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │  │
│  │  │   Pages     │  │ Components  │  │   Hooks     │     │  │
│  │  │   /app      │  │   /ui       │  │   /hooks    │     │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/HTTPS
                         │ (API Routes)
┌────────────────────────▼────────────────────────────────────────┐
│                  Next.js Backend (API Routes)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              /api/*                                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │  │
│  │  │  Projects   │  │   Stages    │  │   Tasks     │     │  │
│  │  │   API       │  │    API      │  │    API      │     │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │  │
│  │  ┌─────────────┐  ┌─────────────┐                       │  │
│  │  │ Subtasks    │  │ Validation  │                       │  │
│  │  │   API       │  │   Layer     │                       │  │
│  │  └─────────────┘  └─────────────┘                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │ Neon SDK
                         │ SQL Queries
┌────────────────────────▼────────────────────────────────────────┐
│                    Neon PostgreSQL Database                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │  │
│  │  │ Projetos │  │  Etapas  │  │  Tarefas │  │Subtarefa│ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Arquitetura de Componentes

### 2.1 Estrutura Frontend (Next.js App Router)

```
/app
├── (auth)/
│   └── layout.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx                    # Lista de projetos
│   └── [projectId]/
│       ├── page.tsx                # Board Kanban
│       ├── settings/
│       │   └── page.tsx            # Configurações do projeto
│       └── loading.tsx
├── api/
│   ├── projects/
│   │   ├── route.ts                # GET, POST
│   │   └── [id]/
│   │       ├── route.ts            # GET, PUT, DELETE
│   │       └── stages/
│   │           └── route.ts        # GET (listar etapas do projeto)
│   ├── stages/
│   │   ├── route.ts                # POST
│   │   └── [id]/
│   │       └── route.ts            # PUT, DELETE
│   ├── tasks/
│   │   ├── route.ts                # GET, POST
│   │   └── [id]/
│   │       ├── route.ts            # GET, PUT, DELETE
│   │       └── move/
│   │           └── route.ts        # PATCH (mover tarefa)
│   └── subtasks/
│       ├── route.ts                # GET, POST
│       └── [id]/
│           ├── route.ts            # PUT, DELETE
│           └── toggle/
│               └── route.ts        # PATCH (alternar status)
├── components/
│   ├── ui/                         # Componentes base (Design System)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── card.tsx
│   │   └── toast.tsx
│   ├── kanban/
│   │   ├── board.tsx               # Container principal do board
│   │   ├── column.tsx              # Coluna (etapa)
│   │   ├── task-card.tsx           # Card de tarefa (draggeable)
│   │   └── drag-context.tsx        # Context para drag and drop
│   ├── projects/
│   │   ├── project-card.tsx
│   │   ├── project-list.tsx
│   │   └── project-form.tsx
│   ├── tasks/
│   │   ├── task-modal.tsx          # Modal de detalhes
│   │   ├── task-form.tsx
│   │   ├── subtask-list.tsx
│   │   └── subtask-item.tsx
│   └── shared/
│       ├── header.tsx
│       ├── layout.tsx
│       └── loading.tsx
├── lib/
│   ├── db/
│   │   └── neon.ts                 # Configuração Neon SDK
│   ├── api/
│   │   └── client.ts               # Cliente API (fetch wrapper)
│   ├── utils/
│   │   ├── validation.ts
│   │   └── errors.ts
│   └── types/
│       └── index.ts                # TypeScript types
├── hooks/
│   ├── use-projects.ts
│   ├── use-tasks.ts
│   ├── use-drag-drop.ts
│   └── use-optimistic-updates.ts
└── styles/
    └── globals.css
```

---

### 2.2 Estrutura Backend (API Routes)

```
/api
├── projects/
│   ├── route.ts                    # Handler para /api/projects
│   │   ├── GET()                   # Listar projetos
│   │   └── POST()                  # Criar projeto
│   └── [id]/
│       ├── route.ts                # Handler para /api/projects/[id]
│       │   ├── GET()               # Obter projeto
│       │   ├── PUT()               # Atualizar projeto
│       │   └── DELETE()            # Excluir projeto
│       └── stages/
│           └── route.ts            # GET - Listar etapas do projeto
│
├── stages/
│   ├── route.ts                    # POST - Criar etapa
│   └── [id]/
│       └── route.ts                # PUT, DELETE - Editar/Excluir etapa
│
├── tasks/
│   ├── route.ts                    # GET, POST - Listar/Criar tarefas
│   └── [id]/
│       ├── route.ts                # GET, PUT, DELETE
│       └── move/
│           └── route.ts            # PATCH - Mover tarefa
│
└── subtasks/
    ├── route.ts                    # GET, POST - Listar/Criar subtarefas
    └── [id]/
        ├── route.ts                # PUT, DELETE
        └── toggle/
            └── route.ts            # PATCH - Alternar status
```

---

## 3. Fluxo de Dados

### 3.1 Fluxo: Criar Tarefa

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  User    │         │  React   │         │   API    │         │   Neon   │
│          │         │ Component│         │  Route   │         │   DB     │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ 1. Clica "Criar"   │                    │                    │
     │───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 2. Abre Modal      │                    │
     │                    │<───────────────────│                    │
     │                    │                    │                    │
     │ 3. Preenche Form   │                    │                    │
     │───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 4. Valida (front)  │                    │
     │                    │                    │                    │
     │                    │ 5. POST /api/tasks │                    │
     │                    │───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │ 6. Valida (back)   │
     │                    │                    │                    │
     │                    │                    │ 7. SQL INSERT      │
     │                    │                    │───────────────────>│
     │                    │                    │                    │
     │                    │                    │ 8. Retorna dados   │
     │                    │                    │<───────────────────│
     │                    │                    │                    │
     │                    │ 9. Retorna JSON    │                    │
     │                    │<───────────────────│                    │
     │                    │                    │                    │
     │                    │ 10. Atualiza UI    │                    │
     │                    │ (optimistic)       │                    │
     │                    │                    │                    │
     │ 11. Vê tarefa nova │                    │                    │
     │<───────────────────│                    │                    │
     │                    │                    │                    │
```

---

### 3.2 Fluxo: Drag and Drop

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  User    │         │  React   │         │   API    │         │   Neon   │
│          │         │  Drag    │         │  Route   │         │   DB     │
│          │         │  Handler │         │          │         │          │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ 1. Mouse Down      │                    │                    │
     │───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 2. Inicia Drag     │                    │
     │                    │ (feedback visual)  │                    │
     │                    │                    │                    │
     │ 3. Arrasta         │                    │                    │
     │───────────────────>│                    │                    │
     │                    │ 4. Calcula posição │                    │
     │                    │                    │                    │
     │ 5. Mouse Up        │                    │                    │
     │───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 6. Otimistic Update│                    │
     │                    │ (move na UI)       │                    │
     │                    │                    │                    │
     │ 7. Vê tarefa movida│                    │                    │
     │<───────────────────│                    │                    │
     │                    │                    │                    │
     │                    │ 8. PATCH /api/tasks/[id]/move
     │                    │───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │ 9. Valida          │
     │                    │                    │                    │
     │                    │                    │ 10. SQL UPDATE     │
     │                    │                    │───────────────────>│
     │                    │                    │                    │
     │                    │                    │ 11. Retorna        │
     │                    │                    │<───────────────────│
     │                    │                    │                    │
     │                    │ 12. Retorna JSON   │                    │
     │                    │<───────────────────│                    │
     │                    │                    │                    │
     │                    │ 13. Confirma ou    │                    │
     │                    │ reverte se erro    │                    │
     │                    │                    │                    │
```

---

## 4. Modelo de Dados (Database Schema)

### 4.1 Diagrama Entidade-Relacionamento

```
┌─────────────────┐
│    PROJETOS     │
├─────────────────┤
│ id (UUID, PK)   │
│ nome (VARCHAR)  │
│ descricao (TEXT)│
│ criado_em       │
│ atualizado_em   │
└────────┬────────┘
         │ 1
         │
         │ N
         │
┌────────▼────────┐
│     ETAPAS      │
├─────────────────┤
│ id (UUID, PK)   │
│ projeto_id (FK) │
│ nome (VARCHAR)  │
│ ordem (INT)     │
│ criado_em       │
│ atualizado_em   │
└────────┬────────┘
         │ 1
         │
         │ N
         │
┌────────▼────────┐
│     TAREFAS     │
├─────────────────┤
│ id (UUID, PK)   │
│ etapa_id (FK)   │
│ projeto_id (FK) │
│ titulo (VARCHAR)│
│ descricao (TEXT)│
│ ordem (INT)     │
│ criado_em       │
│ atualizado_em   │
└────────┬────────┘
         │ 1
         │
         │ N
         │
┌────────▼────────┐
│   SUBTAREFAS    │
├─────────────────┤
│ id (UUID, PK)   │
│ tarefa_id (FK)  │
│ nome (VARCHAR)  │
│ concluida (BOOL)│
│ ordem (INT)     │
│ criado_em       │
│ atualizado_em   │
└─────────────────┘
```

---

## 5. Arquitetura de Camadas

### 5.1 Separação de Responsabilidades

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  React Components (UI)                           │  │
│  │  - Pages, Components, Hooks                      │  │
│  │  - State Management (React State/Context)        │  │
│  │  - User Interactions                             │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                    Application Layer                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  API Routes (Next.js)                            │  │
│  │  - Request/Response Handling                     │  │
│  │  - Authentication/Authorization                  │  │
│  │  - Input Validation                              │  │
│  │  - Error Handling                                │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                     Domain Layer                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Business Logic                                  │  │
│  │  - Domain Models                                 │  │
│  │  - Business Rules                                │  │
│  │  - Service Layer                                 │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                   Infrastructure Layer                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Data Access Layer                               │  │
│  │  - Neon SDK Client                               │  │
│  │  - Database Queries                              │  │
│  │  - Connection Management                         │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                    Database Layer                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Neon PostgreSQL                                 │  │
│  │  - Tables, Indexes, Constraints                  │  │
│  │  - Transactions                                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Integrações Externas

### 6.1 Diagrama de Integrações

```
┌─────────────────────────────────────────────────────────┐
│                    Sistema Kanban                       │
│                                                         │
│  ┌──────────────┐         ┌──────────────┐            │
│  │   Next.js    │         │   Next.js    │            │
│  │   Frontend   │─────────│   Backend    │            │
│  └──────────────┘         └──────┬───────┘            │
│                                  │                     │
└──────────────────────────────────┼─────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
         ┌──────────▼──────────┐      ┌──────────▼──────────┐
         │   Neon SDK          │      │   (Futuro)          │
         │   PostgreSQL        │      │   Auth Provider     │
         │   Database          │      │   (ex: Auth0)       │
         └─────────────────────┘      └─────────────────────┘
```

**Integrações Atuais:**
- **Neon Database:** Banco de dados principal via Neon SDK

**Integrações Futuras (Pós-MVP):**
- **Authentication Provider:** Para autenticação de usuários
- **Email Service:** Para notificações
- **Analytics:** Para métricas e tracking

---

## 7. Fluxo de Requisições HTTP

### 7.1 Request/Response Flow

```
Client Request
    │
    ├─> Next.js Middleware (se houver)
    │
    ├─> API Route Handler
    │   │
    │   ├─> 1. Parse Request (body, params, query)
    │   │
    │   ├─> 2. Validate Input
    │   │   │
    │   │   └─> Return 400 if invalid
    │   │
    │   ├─> 3. Authenticate/Authorize (futuro)
    │   │   │
    │   │   └─> Return 401/403 if unauthorized
    │   │
    │   ├─> 4. Execute Business Logic
    │   │   │
    │   │   ├─> Database Operations (via Neon SDK)
    │   │   │
    │   │   └─> Handle Errors
    │   │
    │   ├─> 5. Format Response
    │   │
    │   └─> 6. Return Response
    │
    └─> Client receives response
```

---

## 8. Padrões de Comunicação

### 8.1 RESTful API Design

**Convenções:**
- **GET:** Recuperar recursos
- **POST:** Criar recursos
- **PUT:** Atualizar recursos completos
- **PATCH:** Atualizar recursos parciais
- **DELETE:** Remover recursos

**Estrutura de URLs:**
```
/api/projects          # Lista de projetos
/api/projects/[id]     # Projeto específico
/api/projects/[id]/stages  # Etapas do projeto
/api/stages            # Criar etapa
/api/stages/[id]       # Atualizar/excluir etapa
/api/tasks             # Lista/criar tarefas
/api/tasks/[id]        # Tarefa específica
/api/tasks/[id]/move   # Mover tarefa
/api/subtasks          # Lista/criar subtarefas
/api/subtasks/[id]     # Subtarefa específica
/api/subtasks/[id]/toggle  # Alternar status
```

---

## 9. Tratamento de Erros

### 9.1 Hierarquia de Erros

```
┌─────────────────────────────────────┐
│         Client Error (4xx)          │
├─────────────────────────────────────┤
│ 400 - Bad Request (validação)       │
│ 401 - Unauthorized (futuro)         │
│ 403 - Forbidden (futuro)            │
│ 404 - Not Found                     │
│ 409 - Conflict                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Server Error (5xx)             │
├─────────────────────────────────────┤
│ 500 - Internal Server Error         │
│ 502 - Bad Gateway                   │
│ 503 - Service Unavailable           │
└─────────────────────────────────────┘
```

---

## 10. Escalabilidade

### 10.1 Estratégias de Escala

**Horizontal Scaling:**
- Múltiplas instâncias Next.js (stateless)
- Load balancer na frente
- Database connection pooling

**Vertical Scaling:**
- Aumentar recursos da instância
- Otimizar queries do banco
- Cache de queries frequentes

**Caching Strategy (Futuro):**
- Redis para cache de sessões
- Cache de queries frequentes
- CDN para assets estáticos

---

**Fim do Documento**

