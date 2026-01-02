# Decisões Arquiteturais (ADRs) - Sistema Kanban

## Formato dos ADRs

Cada ADR segue o formato:
- **Status:** [Proposto | Aceito | Depreciado | Substituído]
- **Contexto:** Situação que motivou a decisão
- **Decisão:** Decisão tomada
- **Consequências:** Impactos positivos e negativos

---

## ADR-001: Uso do Next.js como Framework Full-Stack

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe de Arquitetura

### Contexto

Precisávamos escolher uma stack tecnológica que:
- Atenda ao requisito obrigatório de usar Next.js
- Permita desenvolvimento rápido do MVP
- Suporte API Routes para backend
- Seja escalável e manutenível

### Decisão

Usar **Next.js 14+ com App Router** como framework principal, aproveitando:
- Frontend React com SSR/SSG
- API Routes integradas para backend
- Server Components para performance
- File-based routing

### Consequências

**Positivas:**
- ✅ Framework único para frontend e backend
- ✅ Menos complexidade de deployment
- ✅ Otimizações automáticas do Next.js
- ✅ Grande comunidade e documentação
- ✅ TypeScript suportado nativamente

**Negativas:**
- ⚠️ Acoplamento entre frontend e backend
- ⚠️ Escalabilidade horizontal requer cuidado (stateless necessário)

**Alternativas Consideradas:**
- Next.js + Express separado (rejeitado por complexidade)
- NestJS + React separado (rejeitado por não atender requisito)

---

## ADR-002: Neon PostgreSQL como Banco de Dados

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe de Arquitetura

### Contexto

Requisito obrigatório: usar **Neon SDK** para interagir com banco de dados. Precisávamos escolher entre:
- Neon PostgreSQL (recomendado)
- Outras opções compatíveis

### Decisão

Usar **Neon PostgreSQL serverless** como banco de dados principal, utilizando:
- Neon SDK (`@neondatabase/serverless`)
- PostgreSQL 15+ como engine
- Connection pooling automático
- Branching para ambientes

### Consequências

**Positivas:**
- ✅ Serverless e auto-scaling
- ✅ Connection pooling automático (economiza conexões)
- ✅ Backups automáticos
- ✅ Branching para dev/staging
- ✅ Compatível com SQL padrão
- ✅ Atende requisito obrigatório

**Negativas:**
- ⚠️ Vendor lock-in (Neon específico)
- ⚠️ Limitações de recursos no plano gratuito
- ⚠️ Curva de aprendizado do Neon SDK

**Alternativas Consideradas:**
- PostgreSQL tradicional (rejeitado por não atender requisito)
- MySQL/MariaDB (rejeitado por não ser suportado pelo Neon)

---

## ADR-003: Estrutura de API RESTful

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe de Arquitetura

### Contexto

Precisávamos definir como estruturar as APIs. Opções:
- RESTful tradicional
- GraphQL
- tRPC

### Decisão

Usar **RESTful API** com Next.js API Routes seguindo convenções:
- GET, POST, PUT, PATCH, DELETE conforme apropriado
- URLs semânticas (`/api/projects`, `/api/projects/[id]`)
- JSON como formato de resposta
- Status codes HTTP apropriados

### Consequências

**Positivas:**
- ✅ Padrão amplamente conhecido
- ✅ Fácil de documentar e testar
- ✅ Compatível com ferramentas padrão
- ✅ Cacheável via HTTP

**Negativas:**
- ⚠️ Pode ter over-fetching/under-fetching
- ⚠️ Múltiplas requisições para dados complexos

**Alternativas Consideradas:**
- GraphQL (rejeitado por complexidade desnecessária no MVP)
- tRPC (rejeitado por requerer TypeScript em todo stack)

---

## ADR-004: Biblioteca de Drag and Drop

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe Frontend + Arquitetura

### Contexto

Funcionalidade crítica: drag and drop de tarefas. Precisávamos escolher biblioteca:
- @dnd-kit (moderna)
- react-beautiful-dnd (popular mas antiga)
- HTML5 Drag and Drop nativo (mais trabalho)

### Decisão

Usar **@dnd-kit** como biblioteca principal para drag and drop:
- `@dnd-kit/core` para funcionalidades base
- `@dnd-kit/sortable` para listas ordenáveis
- `@dnd-kit/utilities` para helpers

### Consequências

**Positivas:**
- ✅ Moderna e mantida ativamente
- ✅ Acessível (suporte a keyboard e screen readers)
- ✅ Performance otimizada
- ✅ Suporte a touch devices
- ✅ Flexível e extensível

**Negativas:**
- ⚠️ Curva de aprendizado inicial
- ⚠️ Menos documentação/exemplos que react-beautiful-dnd

**Alternativas Consideradas:**
- react-beautiful-dnd (rejeitado por estar menos mantida)
- HTML5 nativo (rejeitado por complexidade de implementação)

---

## ADR-005: Gerenciamento de Estado

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe Frontend

### Contexto

Precisávamos decidir como gerenciar estado na aplicação:
- Context API do React
- Redux/Zustand
- Server State (React Query/SWR)
- Prop drilling simples

### Decisão

Usar **combinação de abordagens**:
- **Context API** para estado global simples (drag and drop context, UI state)
- **Server State** (React Query ou SWR) para dados do servidor
- **Local State** (useState) para estado de componentes

### Consequências

**Positivas:**
- ✅ Sem dependências extras para estado básico
- ✅ Cache automático de dados do servidor
- ✅ Sincronização automática
- ✅ Menos boilerplate que Redux

**Negativas:**
- ⚠️ Múltiplas soluções para gerenciar
- ⚠️ React Query adiciona dependência

**Alternativas Consideradas:**
- Redux (rejeitado por complexidade desnecessária)
- Apenas Context API (rejeitado por não otimizar server state)

---

## ADR-006: Validação de Dados

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe Backend

### Contexto

Precisamos validar dados em múltiplas camadas:
- Frontend (UX)
- Backend (segurança)

### Decisão

Usar **Zod** para validação:
- Schemas compartilhados entre frontend e backend
- TypeScript type inference automático
- Validação runtime e compile-time

### Consequências

**Positivas:**
- ✅ Type safety end-to-end
- ✅ Schemas reutilizáveis
- ✅ Mensagens de erro customizáveis
- ✅ Popular e bem mantida

**Negativas:**
- ⚠️ Dependência adicional
- ⚠️ Bundle size ligeiramente maior

**Alternativas Consideradas:**
- Yup (rejeitado por não ter type inference tão bom)
- Validação manual (rejeitado por propensão a erros)

---

## ADR-007: Otimistic Updates

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe Frontend + UX

### Contexto

Drag and drop precisa ser responsivo. Opções:
- Aguardar resposta do servidor (lento)
- Otimistic update (rápido, mas requer rollback)

### Decisão

Implementar **Optimistic Updates** para:
- Drag and drop (mover tarefas)
- Marcar/desmarcar subtarefas
- Criar tarefas simples

Com fallback para rollback em caso de erro.

### Consequências

**Positivas:**
- ✅ UI extremamente responsiva
- ✅ Melhor experiência do usuário
- ✅ Sensação de velocidade

**Negativas:**
- ⚠️ Complexidade adicional (lógica de rollback)
- ⚠️ Possibilidade de estado inconsistente temporário
- ⚠️ Requer tratamento de erros robusto

**Alternativas Consideradas:**
- Aguardar servidor (rejeitado por UX ruim)
- Skeleton states (rejeitado por não ser suficiente para drag)

---

## ADR-008: Estrutura de Banco de Dados

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe Backend

### Contexto

Precisávamos definir estrutura do banco:
- Normalização vs desnormalização
- Índices
- Constraints e foreign keys

### Decisão

Estrutura **normalizada** com:
- Tabelas separadas: projetos, etapas, tarefas, subtarefas
- Foreign keys com CASCADE DELETE
- Índices em colunas de busca frequente (projeto_id, etapa_id, ordem)
- Timestamps automáticos (criado_em, atualizado_em)

### Consequências

**Positivas:**
- ✅ Integridade referencial garantida
- ✅ Sem redundância de dados
- ✅ Queries eficientes com índices
- ✅ Fácil manutenção

**Negativas:**
- ⚠️ Algumas queries requerem JOINs
- ⚠️ N+1 queries potenciais (precisa atenção)

**Alternativas Consideradas:**
- Desnormalização (rejeitado por complexidade de sincronização)
- NoSQL (rejeitado por não ser suportado pelo Neon)

---

## ADR-009: Tratamento de Erros

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe Backend + Frontend

### Contexto

Precisamos padronizar tratamento de erros:
- Formato de resposta de erro
- Logging
- Feedback ao usuário

### Decisão

Usar **formato padronizado de erro**:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem amigável",
    "details": {}
  }
}
```

Com status codes HTTP apropriados:
- 400: Bad Request (validação)
- 404: Not Found
- 500: Internal Server Error

### Consequências

**Positivas:**
- ✅ Consistência na API
- ✅ Fácil tratamento no frontend
- ✅ Debugging facilitado

**Negativas:**
- ⚠️ Formato ligeiramente verboso

**Alternativas Consideradas:**
- Apenas status codes (rejeitado por não ter detalhes suficientes)
- Formato customizado (rejeitado por inconsistência)

---

## ADR-010: TypeScript vs JavaScript

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe de Desenvolvimento

### Contexto

Escolher entre TypeScript e JavaScript puro.

### Decisão

Usar **TypeScript** em todo o projeto:
- Type safety
- Melhor DX (autocomplete, refactoring)
- Detecção de erros em compile-time
- Documentação implícita via types

### Consequências

**Positivas:**
- ✅ Menos bugs em produção
- ✅ Melhor manutenibilidade
- ✅ Refactoring seguro
- ✅ Autocomplete melhor

**Negativas:**
- ⚠️ Curva de aprendizado inicial
- ⚠️ Mais verbosidade em alguns casos
- ⚠️ Tempo de compilação

**Alternativas Consideradas:**
- JavaScript (rejeitado por falta de type safety)

---

## ADR-011: Estilização (CSS)

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe Frontend + UX

### Contexto

Escolher abordagem de estilização:
- CSS Modules
- Tailwind CSS
- Styled Components
- CSS-in-JS

### Decisão

Usar **Tailwind CSS**:
- Utility-first, rápido de desenvolver
- Design system consistente
- Purge automático (bundle otimizado)
- Responsividade fácil

### Consequências

**Positivas:**
- ✅ Desenvolvimento rápido
- ✅ Consistência visual
- ✅ Bundle otimizado
- ✅ Fácil manutenção de design system

**Negativas:**
- ⚠️ Classes podem ficar verbosas
- ⚠️ Curva de aprendizado inicial
- ⚠️ HTML mais "poluído"

**Alternativas Consideradas:**
- CSS Modules (rejeitado por não ter design system integrado)
- Styled Components (rejeitado por overhead de runtime)

---

## ADR-012: Estratégia de Deploy

**Status:** Aceito  
**Data:** 2024  
**Decisores:** DevOps + Arquitetura

### Contexto

Escolher plataforma de deployment:
- Vercel (criadores do Next.js)
- Netlify
- Railway/Render
- Self-hosted

### Decisão

Usar **Vercel** como plataforma principal:
- Otimizado para Next.js
- Deploy automático via Git
- Preview deployments
- Analytics integrado
- Edge functions se necessário

### Consequências

**Positivas:**
- ✅ Deploy automático
- ✅ Preview deployments
- ✅ Otimizações automáticas
- ✅ CDN global
- ✅ Analytics integrado

**Negativas:**
- ⚠️ Vendor lock-in
- ⚠️ Custos em escala (mas generoso no plano gratuito)

**Alternativas Consideradas:**
- Self-hosted (rejeitado por complexidade operacional)
- Outros providers (rejeitado por não otimizados para Next.js)

---

## ADR-013: Autenticação (Futuro)

**Status:** Proposto  
**Data:** 2024  
**Decisores:** Equipe de Arquitetura

### Contexto

MVP não inclui autenticação, mas será necessário no futuro.

### Decisão Proposta

Usar **NextAuth.js** quando implementar autenticação:
- Suporte a múltiplos providers
- JWT e session management
- Integração nativa com Next.js
- TypeScript support

### Consequências

**Positivas:**
- ✅ Fácil integração
- ✅ Suporte a OAuth
- ✅ Seguro por padrão

**Negativas:**
- ⚠️ Dependência adicional
- ⚠️ Configuração inicial necessária

**Nota:** Esta decisão será revisada quando autenticação for priorizada.

---

## ADR-014: Testes

**Status:** Aceito  
**Data:** 2024  
**Decisores:** Equipe QA + Desenvolvimento

### Contexto

Definir estratégia de testes para o projeto.

### Decisão

Adotar **estratégia de testes em camadas**:
- **Unit Tests:** Jest + React Testing Library
- **Integration Tests:** API routes e database
- **E2E Tests:** Playwright (futuro, quando necessário)

Foco inicial em testes críticos:
- Validação de dados
- Lógica de negócio
- API routes principais

### Consequências

**Positivas:**
- ✅ Confiança em refatorações
- ✅ Detecção precoce de bugs
- ✅ Documentação via testes

**Negativas:**
- ⚠️ Tempo de desenvolvimento adicional
- ⚠️ Manutenção de testes

**Alternativas Consideradas:**
- Sem testes (rejeitado por risco alto)
- Testes completos desde início (rejeitado por atrasar MVP)

---

## Histórico de Mudanças

| ADR | Data | Mudança |
|-----|------|---------|
| ADR-001 | 2024 | Criado |
| ADR-002 | 2024 | Criado |
| ADR-003 | 2024 | Criado |
| ADR-004 | 2024 | Criado |
| ADR-005 | 2024 | Criado |
| ADR-006 | 2024 | Criado |
| ADR-007 | 2024 | Criado |
| ADR-008 | 2024 | Criado |
| ADR-009 | 2024 | Criado |
| ADR-010 | 2024 | Criado |
| ADR-011 | 2024 | Criado |
| ADR-012 | 2024 | Criado |
| ADR-013 | 2024 | Criado (Proposto) |
| ADR-014 | 2024 | Criado |

---

**Fim do Documento**

