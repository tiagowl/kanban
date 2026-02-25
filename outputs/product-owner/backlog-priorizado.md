# Backlog Priorizado - Sistema Kanban

## Método de Priorização

Utilizando **MoSCoW** (Must Have, Should Have, Could Have, Won't Have) combinado com **Valor vs Esforço** para definir a ordem de desenvolvimento.

### Critérios de Priorização
1. **Valor de Negócio**: Impacto no objetivo principal do produto
2. **Esforço de Desenvolvimento**: Complexidade técnica e tempo estimado
3. **Dependências**: Features que bloqueiam outras
4. **Riscos**: Features com maior risco técnico ou de negócio

---

## Sprint 0 - Fundação (Must Have - Crítico)

### Infraestrutura Base
- **Setup do Projeto Next.js**
  - Configuração inicial
  - Estrutura de pastas
  - Configuração Prisma
  - Conexão com Neon
  
- **Setup do Banco de Dados**
  - Modelagem inicial (User, Project, Stage, Task, Subtask, Label)
  - Migrations
  - Seeders básicos

- **Configuração Shadcn UI**
  - Setup do MCP no Cursor
  - Tema e design system
  - Componentes base

**Prioridade**: 🔴 CRÍTICA  
**Estimativa**: 8 pontos  
**Valor**: Alto (bloqueia tudo)  
**Risco**: Médio

---

## Sprint 1 - Autenticação e Projetos (Must Have)

### US-001: Login de Usuário
**Prioridade**: 🔴 Must Have  
**Estimativa**: 5 pontos  
**Valor**: Alto (bloqueia acesso)  
**Dependências**: Setup do projeto, Banco de dados  
**Risco**: Médio

### US-002: Logout de Usuário
**Prioridade**: 🔴 Must Have  
**Estimativa**: 1 ponto  
**Valor**: Alto  
**Dependências**: US-001  
**Risco**: Baixo

### US-003: Criar Projeto
**Prioridade**: 🔴 Must Have  
**Estimativa**: 3 pontos  
**Valor**: Alto (primeira funcionalidade de valor)  
**Dependências**: US-001  
**Risco**: Baixo

### US-004: Listar Meus Projetos
**Prioridade**: 🔴 Must Have  
**Estimativa**: 2 pontos  
**Valor**: Alto (necessário para navegação)  
**Dependências**: US-003  
**Risco**: Baixo

**Total Sprint 1**: 11 pontos

---

## Sprint 2 - Etapas e Tarefas Básicas (Must Have)

### US-007: Criar Etapa em Projeto
**Prioridade**: 🔴 Must Have  
**Estimativa**: 3 pontos  
**Valor**: Alto (bloqueia criação de tarefas)  
**Dependências**: US-003, US-004  
**Risco**: Baixo

### US-010: Criar Tarefa em Etapa
**Prioridade**: 🔴 Must Have  
**Estimativa**: 3 pontos  
**Valor**: Alto (funcionalidade core)  
**Dependências**: US-007  
**Risco**: Baixo

### US-011: Visualizar Tarefas por Etapa
**Prioridade**: 🔴 Must Have  
**Estimativa**: 2 pontos  
**Valor**: Alto (necessário para visualização)  
**Dependências**: US-010  
**Risco**: Baixo

### US-012: Editar Tarefa
**Prioridade**: 🟡 Should Have  
**Estimativa**: 3 pontos  
**Valor**: Médio-Alto  
**Dependências**: US-010  
**Risco**: Baixo

### US-013: Excluir Tarefa
**Prioridade**: 🟡 Should Have  
**Estimativa**: 2 pontos  
**Valor**: Médio  
**Dependências**: US-010  
**Risco**: Baixo

**Total Sprint 2**: 13 pontos

---

## Sprint 3 - Visualização Kanban e Drag & Drop (Must Have)

### US-026: Visualizar Tarefas em Kanban
**Prioridade**: 🔴 Must Have  
**Estimativa**: 5 pontos  
**Valor**: Alto (diferencial do produto)  
**Dependências**: US-011  
**Risco**: Médio

### US-014: Reordenar Tarefas na Mesma Etapa (Drag and Drop)
**Prioridade**: 🔴 Must Have  
**Estimativa**: 5 pontos  
**Valor**: Alto (UX essencial)  
**Dependências**: US-026  
**Risco**: Alto (complexidade técnica)

### US-015: Mover Tarefa Entre Etapas (Drag and Drop)
**Prioridade**: 🔴 Must Have  
**Estimativa**: 5 pontos  
**Valor**: Alto (funcionalidade core)  
**Dependências**: US-026, US-014  
**Risco**: Alto (complexidade técnica)

**Total Sprint 3**: 15 pontos

---

## Sprint 4 - Gerenciamento Completo (Should Have)

### US-005: Editar Projeto
**Prioridade**: 🟡 Should Have  
**Estimativa**: 2 pontos  
**Valor**: Médio  
**Dependências**: US-003  
**Risco**: Baixo

### US-006: Excluir Projeto
**Prioridade**: 🟡 Should Have  
**Estimativa**: 2 pontos  
**Valor**: Médio  
**Dependências**: US-003  
**Risco**: Médio (cascata de exclusões)

### US-008: Editar Etapa
**Prioridade**: 🟡 Should Have  
**Estimativa**: 2 pontos  
**Valor**: Médio  
**Dependências**: US-007  
**Risco**: Baixo

### US-009: Excluir Etapa
**Prioridade**: 🟡 Should Have  
**Estimativa**: 3 pontos  
**Valor**: Médio  
**Dependências**: US-007  
**Risco**: Médio (cascata de exclusões)

### US-016: Criar Sub-tarefa
**Prioridade**: 🟡 Should Have  
**Estimativa**: 4 pontos  
**Valor**: Médio-Alto  
**Dependências**: US-010  
**Risco**: Baixo

### US-017: Editar Sub-tarefa
**Prioridade**: 🟢 Could Have  
**Estimativa**: 2 pontos  
**Valor**: Baixo-Médio  
**Dependências**: US-016  
**Risco**: Baixo

### US-018: Excluir Sub-tarefa
**Prioridade**: 🟢 Could Have  
**Estimativa**: 2 pontos  
**Valor**: Baixo-Médio  
**Dependências**: US-016  
**Risco**: Baixo

### US-019: Marcar Sub-tarefa como Concluída
**Prioridade**: 🟡 Should Have  
**Estimativa**: 2 pontos  
**Valor**: Médio-Alto  
**Dependências**: US-016  
**Risco**: Baixo

### US-020: Desmarcar Sub-tarefa como Concluída
**Prioridade**: 🟢 Could Have  
**Estimativa**: 1 ponto  
**Valor**: Baixo  
**Dependências**: US-019  
**Risco**: Baixo

**Total Sprint 4**: 20 pontos

---

## Sprint 5 - Sistema de Etiquetas (Should Have)

### US-021: Criar Etiqueta
**Prioridade**: 🟡 Should Have  
**Estimativa**: 3 pontos  
**Valor**: Médio  
**Dependências**: US-003 (projeto)  
**Risco**: Baixo

### US-022: Editar Etiqueta
**Prioridade**: 🟢 Could Have  
**Estimativa**: 2 pontos  
**Valor**: Baixo-Médio  
**Dependências**: US-021  
**Risco**: Baixo

### US-023: Excluir Etiqueta
**Prioridade**: 🟡 Should Have  
**Estimativa**: 2 pontos  
**Valor**: Médio  
**Dependências**: US-021  
**Risco**: Médio (vínculos com tarefas)

### US-024: Vincular Etiqueta a Tarefa
**Prioridade**: 🟡 Should Have  
**Estimativa**: 3 pontos  
**Valor**: Médio-Alto  
**Dependências**: US-021, US-010  
**Risco**: Médio (relação many-to-many)

### US-025: Remover Etiqueta de Tarefa
**Prioridade**: 🟢 Could Have  
**Estimativa**: 2 pontos  
**Valor**: Baixo  
**Dependências**: US-024  
**Risco**: Baixo

**Total Sprint 5**: 12 pontos

---

## Sprint 6 - Visualização Alternativa (Could Have)

### US-027: Visualizar Tarefas em Lista
**Prioridade**: 🟡 Should Have  
**Estimativa**: 4 pontos  
**Valor**: Médio  
**Dependências**: US-026  
**Risco**: Baixo

### US-028: Alternar Entre Visão Kanban e Lista
**Prioridade**: 🟡 Should Have  
**Estimativa**: 3 pontos  
**Valor**: Médio-Alto (UX)  
**Dependências**: US-026, US-027  
**Risco**: Baixo

**Total Sprint 6**: 7 pontos

---

## Resumo do Backlog por Prioridade

### 🔴 Must Have (Crítico) - MVP
1. US-001: Login de Usuário (5 pts)
2. US-002: Logout de Usuário (1 pt)
3. US-003: Criar Projeto (3 pts)
4. US-004: Listar Meus Projetos (2 pts)
5. US-007: Criar Etapa em Projeto (3 pts)
6. US-010: Criar Tarefa em Etapa (3 pts)
7. US-011: Visualizar Tarefas por Etapa (2 pts)
8. US-026: Visualizar Tarefas em Kanban (5 pts)
9. US-014: Reordenar Tarefas na Mesma Etapa (5 pts)
10. US-015: Mover Tarefa Entre Etapas (5 pts)

**Total Must Have**: 34 pontos

### 🟡 Should Have (Importante) - V1.0
1. US-012: Editar Tarefa (3 pts)
2. US-013: Excluir Tarefa (2 pts)
3. US-005: Editar Projeto (2 pts)
4. US-006: Excluir Projeto (2 pts)
5. US-008: Editar Etapa (2 pts)
6. US-009: Excluir Etapa (3 pts)
7. US-016: Criar Sub-tarefa (4 pts)
8. US-019: Marcar Sub-tarefa como Concluída (2 pts)
9. US-021: Criar Etiqueta (3 pts)
10. US-023: Excluir Etiqueta (2 pts)
11. US-024: Vincular Etiqueta a Tarefa (3 pts)
12. US-027: Visualizar Tarefas em Lista (4 pts)
13. US-028: Alternar Entre Visão Kanban e Lista (3 pts)

**Total Should Have**: 35 pontos

### 🟢 Could Have (Desejável) - V1.1+
1. US-017: Editar Sub-tarefa (2 pts)
2. US-018: Excluir Sub-tarefa (2 pts)
3. US-020: Desmarcar Sub-tarefa como Concluída (1 pt)
4. US-022: Editar Etiqueta (2 pts)
5. US-025: Remover Etiqueta de Tarefa (2 pts)

**Total Could Have**: 9 pontos

---

## Roadmap Sugerido

### MVP (Sprints 0-3) - 39 pontos
**Objetivo**: Produto mínimo viável com funcionalidades core  
**Duração estimada**: 3-4 sprints (6-8 semanas)  
**Features**: Autenticação, Projetos, Etapas, Tarefas, Kanban com Drag & Drop

### V1.0 (Sprints 4-6) - 39 pontos
**Objetivo**: Produto completo com todas as funcionalidades essenciais  
**Duração estimada**: 3 sprints (6 semanas)  
**Features**: Edições/Exclusões, Sub-tarefas, Etiquetas, Visualização Lista

### V1.1+ (Sprints futuros) - 9 pontos
**Objetivo**: Melhorias e refinamentos  
**Duração estimada**: 1 sprint (2 semanas)  
**Features**: Funcionalidades complementares, melhorias de UX

---

## Riscos e Dependências Críticas

### Riscos Técnicos
1. **Drag & Drop**: Complexidade de implementação e performance (US-014, US-015)
   - **Mitigação**: Escolher biblioteca madura (dnd-kit), testar com muitos itens

2. **Performance com muitas tarefas**: Degradação com 100+ tarefas por etapa
   - **Mitigação**: Implementar virtualização ou paginação

3. **Concorrência**: Múltiplos usuários editando simultaneamente
   - **Mitigação**: Otimistic updates, debounce, eventual consistency

### Dependências Críticas
- **Sprint 0 → Sprint 1**: Setup completo necessário
- **US-001 → Todas**: Autenticação bloqueia tudo
- **US-003 → US-007**: Projeto antes de etapa
- **US-007 → US-010**: Etapa antes de tarefa
- **US-026 → US-014, US-015**: Visualização antes de drag & drop

---

## Métricas de Sucesso

### MVP
- ✅ Usuário consegue criar projeto, etapas e tarefas
- ✅ Usuário consegue visualizar em Kanban
- ✅ Usuário consegue mover tarefas entre etapas via drag & drop

### V1.0
- ✅ Todas as funcionalidades de CRUD implementadas
- ✅ Sistema de etiquetas funcional
- ✅ Duas formas de visualização disponíveis

### V1.1+
- ✅ Todas as user stories implementadas
- ✅ UX polida e refinada






