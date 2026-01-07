# Decisões Arquiteturais (ADRs) - Sistema Kanban

## Visão Geral

Este documento registra as decisões arquiteturais importantes (Architecture Decision Records - ADRs) tomadas durante o design do Sistema Kanban. Cada ADR documenta o contexto, a decisão tomada e suas consequências.

---

## ADR-001: Uso do Next.js App Router

**Status**: Aceito  
**Data**: 2024-01-15  
**Decisores**: Equipe de Arquitetura

### Contexto

Precisávamos escolher um framework para o frontend que suportasse:
- Server-side rendering (SSR)
- API routes integradas
- Performance otimizada
- Boa experiência de desenvolvimento

### Decisão

Adotar **Next.js 14+ com App Router** como framework principal do frontend e backend (API routes).

### Consequências

**Positivas:**
- Server Components reduzem bundle size
- API routes integradas facilitam desenvolvimento
- Otimizações automáticas (code splitting, image optimization)
- TypeScript suportado nativamente
- Comunidade grande e ativa

**Negativas:**
- App Router é relativamente novo (menos exemplos disponíveis)
- Curva de aprendizado para equipe não familiarizada
- Algumas features ainda em desenvolvimento

**Alternativas Consideradas:**
- **Remix**: Framework similar, mas menos maduro
- **SvelteKit**: Boa performance, mas equipe não familiarizada
- **React + Express separado**: Mais complexidade, não aproveita SSR

---

## ADR-002: Prisma como ORM

**Status**: Aceito  
**Data**: 2024-01-15  
**Decisores**: Equipe de Arquitetura

### Contexto

Precisávamos de um ORM para:
- Type-safe database access
- Migrations gerenciadas
- Boa experiência de desenvolvimento
- Suporte a PostgreSQL

### Decisão

Adotar **Prisma** como ORM principal para acesso ao banco de dados.

### Consequências

**Positivas:**
- Type safety end-to-end (database → código)
- Migrations automáticas e versionadas
- Prisma Studio para visualização de dados
- Query builder poderoso e intuitivo
- Boa performance

**Negativas:**
- Curva de aprendizado inicial
- Schema precisa ser mantido atualizado
- Algumas queries complexas podem ser difíceis de expressar

**Alternativas Consideradas:**
- **TypeORM**: Mais features, mas mais complexo
- **Sequelize**: Maduro, mas menos type-safe
- **SQL puro**: Máximo controle, mas sem type safety e mais verboso

---

## ADR-003: Neon como Banco de Dados

**Status**: Aceito  
**Data**: 2024-01-15  
**Decisores**: Equipe de Arquitetura

### Contexto

Precisávamos de um banco de dados PostgreSQL que oferecesse:
- Hosting gerenciado
- Escalabilidade
- Boa integração com Prisma
- Custo acessível para início

### Decisão

Adotar **Neon PostgreSQL** como banco de dados principal.

### Consequências

**Positivas:**
- Serverless, escala automaticamente
- Branching de banco (dev/staging/prod)
- Integração fácil com Prisma
- Plano gratuito generoso
- Backups automáticos

**Negativas:**
- Vendor lock-in (mas é PostgreSQL padrão)
- Cold starts podem ter latência (serverless)
- Recursos avançados podem ser limitados no plano free

**Alternativas Consideradas:**
- **Supabase**: Similar, mas inclui mais features (auth, storage)
- **Railway**: Bom, mas mais caro
- **PostgreSQL self-hosted**: Máximo controle, mas mais complexo

---

## ADR-004: JWT para Autenticação

**Status**: Aceito  
**Data**: 2024-01-16  
**Decisores**: Equipe de Arquitetura

### Contexto

Precisávamos de uma solução de autenticação que:
- Seja stateless (escalável)
- Não dependa de sessões no servidor
- Seja simples de implementar
- Funcione bem com Next.js API routes

### Decisão

Implementar autenticação usando **JWT (JSON Web Tokens)** com armazenamento no localStorage (ou HttpOnly cookie).

### Consequências

**Positivas:**
- Stateless: não precisa de sessões no servidor
- Escalável: funciona com múltiplas instâncias
- Simples de implementar
- Padrão da indústria

**Negativas:**
- Tokens não podem ser invalidados facilmente (sem blacklist)
- Tokens grandes aumentam tamanho de requisições
- Segurança depende de armazenamento correto
- Refresh tokens precisam ser implementados manualmente

**Alternativas Consideradas:**
- **next-auth**: Mais completo, mas mais complexo
- **OAuth providers**: Mais seguro, mas depende de serviços externos
- **Session-based (cookies)**: Mais simples de invalidar, mas requer armazenamento no servidor

---

## ADR-005: Shadcn UI como Biblioteca de Componentes

**Status**: Aceito  
**Data**: 2024-01-16  
**Decisores**: Equipe de Arquitetura, UX

### Contexto

Precisávamos de componentes UI que fossem:
- Acessíveis (WCAG)
- Customizáveis
- Type-safe
- Modernos e bem mantidos

### Decisão

Adotar **Shadcn UI** como biblioteca base de componentes.

### Consequências

**Positivas:**
- Componentes copiados (não dependência npm), total controle
- Acessíveis por padrão (Radix UI)
- Customizáveis (Tailwind CSS)
- Type-safe (TypeScript)
- Atualização gradual possível

**Negativas:**
- Precisa copiar componentes manualmente
- Manutenção de componentes customizados
- Requer Tailwind CSS configurado

**Alternativas Consideradas:**
- **Material-UI (MUI)**: Completo, mas pesado e difícil de customizar
- **Chakra UI**: Bom, mas menos componentes
- **Ant Design**: Muitos componentes, mas menos customizável

---

## ADR-006: @dnd-kit para Drag and Drop

**Status**: Aceito  
**Data**: 2024-01-17  
**Decisores**: Equipe de Arquitetura, Frontend

### Contexto

Precisávamos de uma biblioteca de drag and drop que:
- Funcione com React
- Seja performática
- Suporte touch (mobile)
- Seja moderna e mantida

### Decisão

Adotar **@dnd-kit** para funcionalidade de drag and drop.

### Consequências

**Positivas:**
- Moderna e ativamente mantida
- Performática (usa pointer events)
- Suporta touch nativamente
- Flexível e customizável
- TypeScript support

**Negativas:**
- Curva de aprendizado
- Documentação pode ser melhor
- Menos exemplos disponíveis que react-beautiful-dnd

**Alternativas Consideradas:**
- **react-beautiful-dnd**: Popular, mas deprecated e não suporta React 18 strict mode
- **react-dnd**: Mais flexível, mas mais complexa
- **HTML5 Drag and Drop nativo**: Sem dependências, mas difícil de usar e pouco suporte mobile

---

## ADR-007: Optimistic Updates no Frontend

**Status**: Aceito  
**Data**: 2024-01-17  
**Decisores**: Equipe de Arquitetura, Frontend

### Contexto

Drag and drop precisa ser responsivo e dar feedback imediato ao usuário. Requisições de rede podem ter latência, causando experiência ruim.

### Decisão

Implementar **optimistic updates** para operações de drag and drop e outras ações críticas de UX.

### Consequências

**Positivas:**
- Interface muito mais responsiva
- Melhor percepção de performance
- UX fluida e natural

**Negativas:**
- Lógica mais complexa
- Precisa reverter em caso de erro
- Pode causar inconsistências temporárias

**Implementação:**
- Atualizar UI imediatamente
- Fazer requisição em background
- Reverter em caso de erro
- Mostrar toast de erro se necessário

---

## ADR-008: API REST em vez de GraphQL

**Status**: Aceito  
**Data**: 2024-01-18  
**Decisores**: Equipe de Arquitetura

### Contexto

Precisávamos definir o protocolo de comunicação entre frontend e backend. GraphQL oferece flexibilidade, mas REST é mais simples e direto.

### Decisão

Usar **REST API** com Next.js API Routes.

### Consequências

**Positivas:**
- Simples de entender e implementar
- Sem overhead de aprendizado
- Padrão familiar para equipe
- Funciona bem com Next.js API Routes

**Negativas:**
- Over-fetching possível (buscar mais dados que necessário)
- Múltiplas requisições para dados relacionados
- Menos flexibilidade que GraphQL

**Alternativas Consideradas:**
- **GraphQL**: Mais flexível, mas mais complexo (tRPC, Apollo)
- **tRPC**: Type-safe end-to-end, mas requer TypeScript em todo stack

---

## ADR-009: Monorepo vs Monolítico

**Status**: Aceito (Monolítico)  
**Data**: 2024-01-18  
**Decisores**: Equipe de Arquitetura

### Contexto

Decidir entre separar frontend e backend em repositórios diferentes ou manter tudo junto.

### Decisão

Manter **arquitetura monolítica** (frontend e backend no mesmo repositório) usando Next.js.

### Consequências

**Positivas:**
- Simples de desenvolver e deployar
- Compartilhamento de tipos TypeScript
- Um único repositório para manter
- Deploy mais simples (Vercel)

**Negativas:**
- Menos flexibilidade para escalar frontend/backend separadamente
- Acoplamento maior entre camadas

**Alternativas Consideradas:**
- **Monorepo separado**: Mais flexibilidade, mas mais complexidade
- **Repositórios separados**: Máxima flexibilidade, mas perda de tipos compartilhados

---

## ADR-010: Validação com Zod

**Status**: Aceito  
**Data**: 2024-01-19  
**Decisores**: Equipe de Arquitetura

### Contexto

Precisávamos validar dados tanto no frontend quanto no backend. Validação manual é propensa a erros e inconsistências.

### Decisão

Adotar **Zod** para validação de schemas em frontend e backend.

### Consequências

**Positivas:**
- Type-safe: gera tipos TypeScript automaticamente
- Uma única fonte de verdade (schema)
- Validação consistente frontend/backend
- Mensagens de erro claras

**Negativas:**
- Dependência adicional
- Curva de aprendizado (mas pequena)

**Alternativas Consideradas:**
- **Yup**: Similar, mas menos type-safe
- **Joi**: Bom, mas sem suporte TypeScript nativo
- **Validação manual**: Controle total, mas propenso a erros

---

## ADR-011: Estrutura de Pastas Baseada em Features

**Status**: Aceito  
**Data**: 2024-01-19  
**Decisores**: Equipe de Arquitetura

### Contexto

Estrutura de pastas afeta manutenibilidade e navegação do código. Precisávamos balancear organização por tipo vs organização por feature.

### Decisão

Adotar **estrutura híbrida**:
- Por tipo para componentes UI compartilhados (`components/ui/`)
- Por feature para componentes de domínio (`components/kanban/`, `components/tasks/`)
- Por tipo para utilities e libs (`lib/`, `hooks/`)

### Consequências

**Positivas:**
- Componentes relacionados ficam juntos
- Fácil de encontrar código relacionado
- Escalável para features novas
- Balance entre organização e pragmatismo

**Negativas:**
- Pode ter duplicação de padrões
- Precisa disciplina para manter organização

**Alternativas Consideradas:**
- **Puramente por tipo**: Simples, mas difícil encontrar código relacionado
- **Puramente por feature**: Ideal, mas pode ter muita duplicação

---

## ADR-012: Server Components vs Client Components

**Status**: Aceito  
**Data**: 2024-01-20  
**Decisores**: Equipe de Arquitetura, Frontend

### Contexto

Next.js App Router suporta Server Components (por padrão) e Client Components (com 'use client'). Precisávamos definir quando usar cada um.

### Decisão

Usar **Server Components por padrão** e Client Components apenas quando necessário (interatividade, hooks, browser APIs).

### Consequências

**Positivas:**
- Menor bundle JavaScript no cliente
- Melhor performance inicial
- SEO melhor
- Dados frescos do servidor

**Negativas:**
- Limitações (sem hooks, sem browser APIs)
- Precisa separar lógica cuidadosamente

**Regras:**
- Server Components: Listagens, dados estáticos, layouts
- Client Components: Formulários, interações, drag and drop, estado local

---

## ADR-013: Gerenciamento de Estado

**Status**: Aceito  
**Data**: 2024-01-20  
**Decisores**: Equipe de Arquitetura, Frontend

### Contexto

Precisávamos definir como gerenciar estado na aplicação. Context API, Redux, Zustand, etc.

### Decisão

Usar **múltiplas estratégias**:
- **React useState/useReducer**: Estado local de componentes
- **Custom Hooks**: Estado compartilhado simples (`useTasks`, `useProjects`)
- **Server State**: React Query ou SWR (futuro, se necessário)
- **Evitar Redux**: Complexidade desnecessária para MVP

### Consequências

**Positivas:**
- Simples para MVP
- Sem overhead de biblioteca pesada
- Evolui conforme necessidade

**Negativas:**
- Pode precisar refatorar se escala
- Estado pode ficar espalhado

**Alternativas Consideradas:**
- **Redux**: Poderoso, mas complexo demais para MVP
- **Zustand**: Mais leve que Redux, considerar no futuro
- **React Query**: Bom para server state, adicionar se necessário

---

## ADR-014: Estratégia de Cache

**Status**: Aceito (Deferido para V2)  
**Data**: 2024-01-21  
**Decisores**: Equipe de Arquitetura

### Contexto

Cache pode melhorar performance significativamente, mas adiciona complexidade.

### Decisão

**Não implementar cache no MVP**. Adicionar cache (Redis ou similar) na V2 se necessário.

### Consequências

**Positivas:**
- Menos complexidade no MVP
- Menos pontos de falha
- Implementação mais rápida

**Negativas:**
- Performance pode degradar com muitos usuários
- Mais queries ao banco

**Plano Futuro:**
- Monitorar performance
- Adicionar Redis se necessário
- Cache de queries frequentes
- Cache de sessões (se migrar de JWT)

---

## ADR-015: Testes Automatizados

**Status**: Aceito  
**Data**: 2024-01-21  
**Decisores**: Equipe de Arquitetura, QA

### Contexto

Testes garantem qualidade, mas têm custo de manutenção.

### Decisão

Implementar **testes focados**:
- Unit tests para services e utilities críticos
- Integration tests para API routes principais
- E2E tests para fluxos críticos (Login, Criar Projeto, Drag & Drop)

### Consequências

**Positivas:**
- Confiança em mudanças
- Detecta regressões
- Documenta comportamento esperado

**Negativas:**
- Tempo de desenvolvimento aumenta
- Manutenção contínua necessária

**Ferramentas:**
- Vitest para unit/integration
- Playwright para E2E
- Testing Library para componentes

---

## ADR-016: Deploy e Hosting

**Status**: Aceito  
**Data**: 2024-01-22  
**Decisores**: Equipe de Arquitetura, DevOps

### Contexto

Precisávamos escolher plataforma de deploy que seja simples, escalável e econômica.

### Decisão

Usar **Vercel** para deploy do Next.js app e **Neon** para banco de dados.

### Consequências

**Positivas:**
- Deploy automático via Git
- HTTPS automático
- Escalabilidade automática
- Preview deployments
- Plano gratuito generoso

**Negativas:**
- Vendor lock-in (mas fácil migrar)
- Limites no plano gratuito

**Alternativas Consideradas:**
- **Railway**: Similar, mas mais caro
- **AWS/GCP**: Máxima flexibilidade, mas mais complexo
- **Self-hosted**: Controle total, mas manutenção alta

---

## Resumo das Decisões

| ADR | Tópico | Status | Impacto |
|-----|--------|--------|---------|
| ADR-001 | Next.js App Router | Aceito | Alto |
| ADR-002 | Prisma ORM | Aceito | Alto |
| ADR-003 | Neon PostgreSQL | Aceito | Alto |
| ADR-004 | JWT Authentication | Aceito | Médio |
| ADR-005 | Shadcn UI | Aceito | Médio |
| ADR-006 | @dnd-kit | Aceito | Médio |
| ADR-007 | Optimistic Updates | Aceito | Baixo |
| ADR-008 | REST API | Aceito | Médio |
| ADR-009 | Monolítico | Aceito | Baixo |
| ADR-010 | Zod Validation | Aceito | Médio |
| ADR-011 | Estrutura de Pastas | Aceito | Baixo |
| ADR-012 | Server Components | Aceito | Médio |
| ADR-013 | Estado | Aceito | Médio |
| ADR-014 | Cache | Deferido | Baixo |
| ADR-015 | Testes | Aceito | Médio |
| ADR-016 | Deploy (Vercel) | Aceito | Baixo |

---

## Conclusão

Estas decisões arquiteturais fornecem uma base sólida e consistente para o desenvolvimento do Sistema Kanban. Todas as decisões foram tomadas considerando:
- Simplicidade para MVP
- Escalabilidade futura
- Manutenibilidade
- Experiência de desenvolvimento

**Revisão Periódica**: ADRs devem ser revisados a cada sprint ou quando houver mudanças significativas nos requisitos.



