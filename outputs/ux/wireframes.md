# Wireframes - Sistema Kanban

## 1. Visão Geral

Este documento apresenta os wireframes detalhados para o sistema Kanban, organizados por telas principais e funcionalidades. Os wireframes consideram fluxos de navegação, hierarquia de informação, interações do usuário e responsividade.

**Metodologia:** Wireframes de baixa/média fidelidade focados em estrutura e layout antes de detalhes visuais.

---

## 2. Estrutura de Navegação

### 2.1 Hierarquia de Telas

```
┌─────────────────────────────────────┐
│        Dashboard / Lista Projetos   │
└────────────┬────────────────────────┘
             │
             ├─> ┌──────────────────────┐
             │   │   View do Projeto    │
             │   │    (Board Kanban)    │
             │   └──────────┬───────────┘
             │              │
             │              ├─> ┌──────────────────┐
             │              │   │  Detalhes Tarefa │
             │              │   │     (Modal)      │
             │              │   └──────────────────┘
             │              │
             │              ├─> ┌──────────────────┐
             │              │   │  Criar/Editar    │
             │              │   │   Tarefa/Etapa   │
             │              │   └──────────────────┘
             │              │
             │              └─> ┌──────────────────┐
             │                  │  Configurações   │
             │                  │     Projeto      │
             │                  └──────────────────┘
             │
             └─> ┌──────────────────────┐
                 │   Criar Projeto      │
                 │     (Modal/Page)     │
                 └──────────────────────┘
```

---

## 3. Wireframes Detalhados

### 3.1 Tela: Dashboard / Lista de Projetos

**Descrição:** Primeira tela após login, mostra todos os projetos do usuário.

**Layout Desktop:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Header                                                                  │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ [Logo] Sistema Kanban                    [+ Novo Projeto] [Perfil] │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  < Página Inicial >                    [Filtrar] [Ordenar] [Buscar]   │
│                                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐             │
│  │ 📁 Projeto A  │  │ 📁 Projeto B  │  │ 📁 Projeto C  │             │
│  │               │  │               │  │               │             │
│  │ 15 tarefas    │  │ 8 tarefas     │  │ 23 tarefas    │             │
│  │               │  │               │  │               │             │
│  │ [████░░░░] 60%│  │ [███░░░░░] 40%│  │ [█████░░░] 80%│             │
│  │               │  │               │  │               │             │
│  │ Atualizado:   │  │ Atualizado:   │  │ Atualizado:   │             │
│  │ há 2 horas    │  │ há 1 dia      │  │ há 3 horas    │             │
│  │               │  │               │  │               │             │
│  │ [Abrir] [...] │  │ [Abrir] [...] │  │ [Abrir] [...] │             │
│  └───────────────┘  └───────────────┘  └───────────────┘             │
│                                                                         │
│  ┌───────────────┐  ┌───────────────┐                                 │
│  │ 📁 Projeto D  │  │  [+ Criar]    │                                 │
│  │               │  │   Projeto     │                                 │
│  │ 5 tarefas     │  │               │                                 │
│  │               │  │               │                                 │
│  │ [██░░░░░░] 20%│  │               │                                 │
│  │               │  │               │                                 │
│  │ Atualizado:   │  │               │                                 │
│  │ há 5 dias     │  │               │                                 │
│  │               │  │               │                                 │
│  │ [Abrir] [...] │  │               │                                 │
│  └───────────────┘  └───────────────┘                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Elementos Principais:**
- Header fixo com logo e ações principais
- Grid responsivo de cards de projetos
- Cada card mostra: nome, número de tarefas, progresso visual, última atualização
- Card especial para criar novo projeto
- Barra de busca e filtros no topo

**Estados:**
- **Empty State:** Mensagem amigável com botão destacado "Criar Primeiro Projeto"
- **Loading:** Skeleton screens dos cards
- **Error:** Mensagem de erro com opção de retry

---

### 3.2 Tela: Board Kanban (View do Projeto)

**Descrição:** Tela principal do sistema, mostra o board Kanban com todas as etapas e tarefas.

**Layout Desktop:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Header                                                                  │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ [←] Projeto: Nome do Projeto          [Config] [Etapa +] [Tarefa +] │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │    Backlog       │  │      Todo        │  │     Doing        │   │
│  │    (3)           │  │      (5)         │  │      (2)         │   │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤   │
│  │                  │  │                  │  │                  │   │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │   │
│  │ │ Tarefa 1     │ │  │ │ Tarefa 4     │ │  │ │ Tarefa 6     │ │   │
│  │ │ Descrição... │ │  │ │ Descrição... │ │  │ │ Descrição... │ │   │
│  │ │ [3/5 ✓]      │ │  │ │ [0/2 ✓]      │ │  │ │ [2/2 ✓]      │ │   │
│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │   │
│  │                  │  │                  │  │                  │   │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │   │
│  │ │ Tarefa 2     │ │  │ │ Tarefa 5     │ │  │ │ Tarefa 7     │ │   │
│  │ │ Descrição... │ │  │ │ Descrição... │ │  │ │ Descrição... │ │   │
│  │ │ [0/0 ✓]      │ │  │ │ [1/3 ✓]      │ │  │ │ [1/4 ✓]      │ │   │
│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │   │
│  │                  │  │                  │  │                  │   │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │                  │   │
│  │ │ Tarefa 3     │ │  │ │              │ │  │                  │   │
│  │ │ Descrição... │ │  │ │ [+ Adicionar]│ │  │                  │   │
│  │ │ [0/1 ✓]      │ │  │ │   Tarefa     │ │  │                  │   │
│  │ └──────────────┘ │  │ │              │ │  │                  │   │
│  │                  │  │ └──────────────┘ │  │                  │   │
│  │ [+ Adicionar]    │  │                  │  │                  │   │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘   │
│                                                                         │
│  ┌──────────────────┐  ┌──────────────────┐                           │
│  │      Done        │  │                  │                           │
│  │      (4)         │  │                  │                           │
│  ├──────────────────┤  │                  │                           │
│  │                  │  │                  │                           │
│  │ ┌──────────────┐ │  │                  │                           │
│  │ │ Tarefa 8     │ │  │                  │                           │
│  │ │ Descrição... │ │  │                  │                           │
│  │ │ [5/5 ✓]      │ │  │                  │                           │
│  │ └──────────────┘ │  │                  │                           │
│  │                  │  │                  │                           │
│  │ ┌──────────────┐ │  │                  │                           │
│  │ │ Tarefa 9     │ │  │                  │                           │
│  │ │ Descrição... │ │  │                  │                           │
│  │ │ [2/2 ✓]      │ │  │                  │                           │
│  │ └──────────────┘ │  │                  │                           │
│  │                  │  │                  │                           │
│  │ [+ Adicionar]    │  │                  │                           │
│  └──────────────────┘  └──────────────────┘                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Elementos Principais:**
- Header com nome do projeto e ações principais
- Board horizontal scrollável com colunas (etapas)
- Cada coluna mostra: nome da etapa, contador de tarefas
- Cards de tarefas dentro de cada coluna
- Botão "+ Adicionar Tarefa" em cada coluna
- Cards são draggeable (arrastáveis)

**Comportamentos:**
- Scroll horizontal quando há muitas etapas
- Scroll vertical dentro de cada coluna se houver muitas tarefas
- Indicador visual ao arrastar tarefa sobre outra coluna
- Botão de adicionar etapa no final do board

**Estados:**
- **Empty State (Etapa Vazia):** Mensagem "Nenhuma tarefa" e botão de adicionar
- **Empty State (Projeto Vazio):** Mensagem centralizada para criar primeira etapa
- **Loading:** Skeleton screens das colunas e cards
- **Dragging:** Card arrastado fica semitransparente, área de drop destacada

---

### 3.3 Modal: Detalhes da Tarefa

**Descrição:** Modal ou painel lateral que abre ao clicar em uma tarefa, mostrando detalhes completos e subtarefas.

**Layout Desktop (Modal):**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                    ┌───────────────────────────────────┐                │
│                    │  Detalhes da Tarefa          [X]  │                │
│                    ├───────────────────────────────────┤                │
│                    │                                   │                │
│                    │  Título da Tarefa                │                │
│                    │  [Editar]                        │                │
│                    │                                   │                │
│                    │  Etapa: [Doing ▼]                │                │
│                    │                                   │                │
│                    │  Descrição:                      │                │
│                    │  ┌─────────────────────────────┐ │                │
│                    │  │ Descrição detalhada da      │ │                │
│                    │  │ tarefa aqui...              │ │                │
│                    │  │                             │ │                │
│                    │  └─────────────────────────────┘ │                │
│                    │                                   │                │
│                    │  Subtarefas (3/5 concluídas)     │                │
│                    │  ┌─────────────────────────────┐ │                │
│                    │  │ ☑ Subtarefa 1 (concluída)  │ │                │
│                    │  │ ☐ Subtarefa 2              │ │                │
│                    │  │ ☑ Subtarefa 3 (concluída)  │ │                │
│                    │  │ ☐ Subtarefa 4              │ │                │
│                    │  │ ☑ Subtarefa 5 (concluída)  │ │                │
│                    │  │                             │ │                │
│                    │  │ [+ Adicionar Subtarefa]    │ │                │
│                    │  └─────────────────────────────┘ │                │
│                    │                                   │                │
│                    │  ┌──────────────┐ ┌────────────┐│                │
│                    │  │ [Salvar]     │ │ [Excluir]  ││                │
│                    │  └──────────────┘ └────────────┘│                │
│                    │                                   │                │
│                    └───────────────────────────────────┘                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Elementos Principais:**
- Header do modal com título e botão fechar
- Campo de título editável
- Dropdown para mudar etapa (alternativa ao drag and drop)
- Área de descrição (textarea)
- Lista de subtarefas com checkboxes
- Botão para adicionar nova subtarefa
- Ações: Salvar e Excluir

**Comportamentos:**
- Fechar ao clicar fora ou pressionar ESC
- Salvamento automático ao editar (debounce)
- Checkbox de subtarefa atualiza imediatamente
- Edição inline de subtarefas

---

### 3.4 Modal: Criar/Editar Tarefa

**Descrição:** Formulário para criar ou editar uma tarefa.

**Layout Desktop:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ┌───────────────────────────────────┐                │
│                    │  Criar Nova Tarefa            [X]  │                │
│                    ├───────────────────────────────────┤                │
│                    │                                   │                │
│                    │  Título *                        │                │
│                    │  ┌─────────────────────────────┐ │                │
│                    │  │                            │ │                │
│                    │  └─────────────────────────────┘ │                │
│                    │                                   │                │
│                    │  Etapa *                         │                │
│                    │  [Todo ▼]                        │                │
│                    │                                   │                │
│                    │  Descrição                       │                │
│                    │  ┌─────────────────────────────┐ │                │
│                    │  │                            │ │                │
│                    │  │                            │ │                │
│                    │  │                            │ │                │
│                    │  └─────────────────────────────┘ │                │
│                    │                                   │                │
│                    │  ┌──────────────┐ ┌────────────┐│                │
│                    │  │ [Cancelar]   │ │ [Criar]    ││                │
│                    │  └──────────────┘ └────────────┘│                │
│                    │                                   │                │
│                    └───────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────────┘
```

**Elementos Principais:**
- Título obrigatório
- Dropdown para selecionar etapa
- Descrição opcional (textarea)
- Botões de ação: Cancelar e Criar/Salvar

**Validações:**
- Título não pode ser vazio
- Mensagem de erro abaixo do campo se inválido
- Botão Criar desabilitado se inválido

---

### 3.5 Modal: Criar/Editar Projeto

**Descrição:** Formulário para criar ou editar um projeto.

**Layout Desktop:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ┌───────────────────────────────────┐                │
│                    │  Criar Novo Projeto           [X]  │                │
│                    ├───────────────────────────────────┤                │
│                    │                                   │                │
│                    │  Nome do Projeto *               │                │
│                    │  ┌─────────────────────────────┐ │                │
│                    │  │                            │ │                │
│                    │  └─────────────────────────────┘ │                │
│                    │                                   │                │
│                    │  Descrição                       │                │
│                    │  ┌─────────────────────────────┐ │                │
│                    │  │                            │ │                │
│                    │  │                            │ │                │
│                    │  │                            │ │                │
│                    │  └─────────────────────────────┘ │                │
│                    │                                   │                │
│                    │  ┌──────────────┐ ┌────────────┐│                │
│                    │  │ [Cancelar]   │ │ [Criar]    ││                │
│                    │  └──────────────┘ └────────────┘│                │
│                    │                                   │                │
│                    └───────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────────┘
```

**Elementos Principais:**
- Nome obrigatório
- Descrição opcional
- Botões de ação

---

### 3.6 Modal: Criar Etapa

**Descrição:** Formulário para criar uma nova etapa no projeto.

**Layout Desktop:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ┌───────────────────────────────────┐                │
│                    │  Criar Nova Etapa             [X]  │                │
│                    ├───────────────────────────────────┤                │
│                    │                                   │                │
│                    │  Nome da Etapa *                 │                │
│                    │  ┌─────────────────────────────┐ │                │
│                    │  │ Ex: Todo, Doing, Done       │ │                │
│                    │  └─────────────────────────────┘ │                │
│                    │                                   │                │
│                    │  Sugestões:                      │                │
│                    │  [Backlog] [Todo] [Doing] [Done] │                │
│                    │                                   │                │
│                    │  ┌──────────────┐ ┌────────────┐│                │
│                    │  │ [Cancelar]   │ │ [Criar]    ││                │
│                    │  └──────────────┘ └────────────┘│                │
│                    │                                   │                │
│                    └───────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────────┘
```

**Elementos Principais:**
- Nome obrigatório
- Botões de sugestões para etapas comuns
- Botões de ação

---

## 4. Wireframes Mobile

### 4.1 Board Kanban (Mobile)

**Layout Mobile:**

```
┌─────────────────────┐
│ [☰] Projeto    [+]  │
├─────────────────────┤
│                     │
│ ┌─────────────────┐ │
│ │   Backlog  (3)  │ │
│ ├─────────────────┤ │
│ │ ┌─────────────┐ │ │
│ │ │ Tarefa 1    │ │ │
│ │ │ [3/5 ✓]     │ │ │
│ │ └─────────────┘ │ │
│ │ ┌─────────────┐ │ │
│ │ │ Tarefa 2    │ │ │
│ │ └─────────────┘ │ │
│ │ [+ Adicionar]   │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │    Todo    (5)  │ │
│ ├─────────────────┤ │
│ │ ┌─────────────┐ │ │
│ │ │ Tarefa 3    │ │ │
│ │ └─────────────┘ │ │
│ │ [+ Adicionar]   │ │
│ └─────────────────┘ │
│                     │
│ [< 1/4 >]          │
│                     │
└─────────────────────┘
```

**Adaptações Mobile:**
- Colunas empilhadas verticalmente
- Navegação por swipe ou paginação entre etapas
- Menu hambúrguer no header
- Cards menores mas ainda clicáveis
- Botão flutuante para criar tarefa rápida

---

## 5. Fluxos de Interação

### 5.1 Fluxo: Criar Tarefa Rápida

```
Board → Clica [+ Adicionar] na coluna
     → Modal abre com formulário
     → Preenche título (mínimo necessário)
     → Clica [Criar]
     → Modal fecha
     → Tarefa aparece no topo da coluna
     → Feedback sutil de sucesso
```

### 5.2 Fluxo: Drag and Drop

```
Board → Clica e segura card
     → Card fica "flutuando" (visual feedback)
     → Arrasta sobre outra coluna
     → Coluna destaca (indica área válida)
     → Solta card
     → Card move imediatamente (otimistic update)
     → API salva em background
     → Feedback de sucesso (ou erro se falhar)
```

### 5.3 Fluxo: Ver Detalhes da Tarefa

```
Board → Clica em card de tarefa
     → Modal abre com detalhes
     → Visualiza/edita informações
     → Adiciona/edita subtarefas
     → Marca subtarefas como concluídas
     → Clica [X] ou fora do modal
     → Modal fecha, board atualizado
```

---

## 6. Estados da Interface

### 6.1 Loading States
- **Skeleton Screens:** Para listas de projetos e colunas do board
- **Spinner:** Para ações que demoram (criar projeto, etc.)
- **Progress Bar:** Para operações longas

### 6.2 Empty States
- **Projeto Vazio:** Mensagem amigável + botão para criar primeira etapa
- **Etapa Vazia:** Mensagem simples + botão para adicionar tarefa
- **Nenhum Projeto:** Mensagem motivacional + botão grande para criar projeto

### 6.3 Error States
- **Erro de Rede:** Mensagem clara + botão de retry
- **Validação:** Mensagem abaixo do campo inválido
- **Erro Geral:** Toast notification com mensagem e ação

### 6.4 Success States
- **Toast Notification:** Confirmação sutil de ações (criar, salvar, etc.)
- **Visual Feedback:** Animações suaves em transições
- **Indicadores:** Contadores atualizados, progresso visual

---

## 7. Responsividade

### 7.1 Breakpoints
- **Mobile:** < 768px (colunas empilhadas)
- **Tablet:** 768px - 1024px (2 colunas visíveis)
- **Desktop:** > 1024px (múltiplas colunas, scroll horizontal)

### 7.2 Adaptações por Dispositivo
- **Mobile:**
  - Navegação bottom sheet ou menu lateral
  - Cards menores mas touch-friendly (min 44px)
  - Gestos de swipe para navegar entre etapas
  
- **Tablet:**
  - 2-3 colunas visíveis simultaneamente
  - Modal ocupa mais espaço
  
- **Desktop:**
  - Múltiplas colunas, scroll horizontal
  - Hover states e tooltips
  - Atalhos de teclado

---

## 8. Acessibilidade

### 8.1 Navegação por Teclado
- Tab order lógico
- Foco visível em todos os elementos interativos
- Escape fecha modais
- Enter ativa botões/cards

### 8.2 Screen Readers
- Labels descritivos em todos os campos
- ARIA labels em botões de ação
- Status announcements para drag and drop
- Nomes descritivos para links e botões

### 8.3 Contraste e Visual
- Contraste mínimo WCAG AA
- Texto legível em todos os tamanhos
- Indicadores não dependem apenas de cor

---

## 9. Próximos Passos

### 9.1 Validação
- Testar wireframes com usuários
- Validar fluxos de navegação
- Confirmar hierarquia de informação

### 9.2 Refinamento
- Adicionar mais detalhes visuais
- Criar protótipos de alta fidelidade
- Definir sistema de design (cores, tipografia, espaçamento)

### 9.3 Implementação
- Priorizar telas do MVP
- Desenvolver componentes base
- Iterar baseado em feedback

