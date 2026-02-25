# Protótipos Interativos - Sistema Kanban

## Visão Geral

Os protótipos interativos definem o comportamento detalhado da interface, incluindo transições, animações, estados e feedback visual. Estes protótipos servem como guia para implementação e validação de usabilidade.

---

## 1. Protótipo: Drag and Drop de Tarefas

### Comportamento Base

**Início do Drag:**
- Usuário clica e segura em um card de tarefa
- Após 150ms, o drag é iniciado
- Card original mantém opacidade reduzida (50%)
- Cursor muda para "grabbing"
- Preview do card segue o cursor com leve elevação (shadow)

**Durante o Drag:**
- Card arrastado tem sombra maior (elevação)
- Áreas válidas (colunas) destacam com borda pontilhada ou cor de fundo sutil
- Área de destino mostra indicador de posição (linha ou espaço)
- Outros cards se reposicionam para abrir espaço
- Feedback visual: "Soltar aqui para mover"

**Soltar (Drop):**
- Se válido: Animação suave de inserção (200ms ease-out)
- Card aparece na nova posição com animação de fade-in
- Toast de confirmação: "Tarefa movida para [Etapa]"
- Persistência automática no backend (sem loading visível)

**Cancelar (Soltar fora):**
- Card retorna à posição original com animação (300ms spring)
- Opacidade volta ao normal
- Feedback: "Movimento cancelado" (toast discreto)

### Estados de Validação

**Válido:**
- Borda verde sutil na coluna de destino
- Ícone de check aparece brevemente
- Preview do card mostra versão "aceita"

**Inválido:**
- Borda vermelha pulsante na área inválida
- Ícone de X aparece
- Preview do card mostra versão "rejeitada"
- Tooltip: "Não é possível mover para esta etapa"

### Animações Específicas

```
Drag Start:
- Opacity: 1.0 → 0.5 (original card)
- Transform: scale(1.0) → scale(1.05) (dragged card)
- Box-shadow: normal → large
- Transition: 150ms ease-in

During Drag:
- Dragged card: transform: translate(x, y) + rotate(2deg)
- Target column: background-color: rgba(green, 0.1)
- Drop indicator: height 0 → 4px (pulse animation)

Drop Success:
- New position: opacity 0 → 1, scale 0.9 → 1.0
- Original position: opacity 0.5 → 1, scale 1.05 → 1.0
- Transition: 200ms ease-out

Drop Cancel:
- Return animation: translate(x, y) → translate(0, 0)
- Opacity: 0.5 → 1.0
- Transition: 300ms spring(0.4, 0.0, 0.2, 1.0)
```

---

## 2. Protótipo: Criação Inline de Tarefa

### Fluxo Interativo

**Estado 1: Botão Inativo**
```
[+ Adicionar tarefa]  (botão discreto no rodapé da coluna)
```

**Estado 2: Campo de Input Ativo**
```
┌─────────────────────────┐
│ [_____________________] │  ← Input focado automaticamente
│                         │
└─────────────────────────┘
```

**Interações:**
- Click no botão → Input aparece com animação slide-down (200ms)
- Input recebe foco automaticamente
- Placeholder: "Digite o título da tarefa..."

**Estado 3: Criando (Enter)**
- Loading spinner no botão (opcional, se demorar)
- Input desabilita
- Feedback: "Criando tarefa..."

**Estado 4: Sucesso**
- Nova tarefa aparece no topo da lista com animação:
  - Fade-in (opacity 0 → 1)
  - Slide-down (translateY(-10px) → 0)
  - Scale (0.95 → 1.0)
- Toast: "Tarefa criada!"
- Input reseta e volta ao estado 2 (pronto para próxima)

**Estado 5: Cancelar (Esc ou click fora)**
- Input desaparece com slide-up (200ms)
- Retorna ao botão "+ Adicionar tarefa"

### Validação em Tempo Real
- Enquanto digita: Sem validação (permite espaço)
- Ao tentar criar: Valida se não está vazio
- Erro: Input fica vermelho, mensagem abaixo "Título é obrigatório"

---

## 3. Protótipo: Modal/Drawer de Detalhes da Tarefa

### Abertura

**Trigger:**
- Click em qualquer parte do card de tarefa
- Ação: "Editar tarefa" no menu de contexto

**Animação de Entrada:**
- Drawer desliza da direita (desktop) ou de baixo (mobile)
- Backdrop fade-in simultâneo (opacity 0 → 0.5)
- Duração: 300ms ease-out

```
Estado Inicial:
┌─────────────────────────┐
│                    [×]  │ ← Fora da tela (translateX(100%))
│                         │
└─────────────────────────┘

Estado Final:
┌─────────────────────────┐
│                    [×]  │ ← Na tela (translateX(0))
│  Conteúdo da tarefa     │
│                         │
└─────────────────────────┘
```

### Estados Interativos

**Modo Visualização:**
- Todos os campos são readonly
- Botão primário: "Editar"
- Ações: [Editar] [Excluir] [Fechar]

**Transição para Edição:**
- Click em "Editar"
- Campos tornam-se editáveis (animação sutil)
- Botões mudam: [Salvar] [Cancelar] [Excluir]
- Transição: 200ms

**Modo Edição:**
- Inputs com borda ativa (focus state)
- Validação em tempo real
- Botão "Salvar" desabilitado se houver erros

**Salvamento:**
1. Click em "Salvar"
2. Loading state no botão (spinner)
3. Campos desabilitam
4. Requisição ao backend
5. Sucesso: Toast "Tarefa atualizada!" + Drawer fecha
6. Erro: Toast com erro + Campos reabilitam

**Cancelamento:**
- Click em "Cancelar" ou "Fechar (×)"
- Se houver mudanças não salvas: Dialog de confirmação
- Se não houver mudanças: Fecha imediatamente

**Fechamento:**
- Drawer desliza para fora (slide-out)
- Backdrop fade-out
- Duração: 250ms ease-in

---

## 4. Protótipo: Alternância Kanban ↔ Lista

### Toggle Button

**Estado Kanban Ativo:**
```
[Kanban] [Lista]  ← Kanban destacado, Lista discreto
```

**Click em "Lista":**
1. Botão muda estado (200ms)
2. Loading overlay sutil (opcional, se muitos dados)
3. Transição de layout:
   - Kanban: Fade-out + scale-down (opacity 1 → 0, scale 1 → 0.95)
   - Lista: Fade-in + scale-up (opacity 0 → 1, scale 0.95 → 1)
4. Duração total: 300ms
5. Preferência salva (localStorage)

**Transição Reversa (Lista → Kanban):**
- Mesma animação, invertida
- Estado preservado (projeto, filtros)

### Preservação de Contexto
- Projeto selecionado: Mantém
- Filtros ativos: Mantém
- Scroll position: Reseta (topo)

---

## 5. Protótipo: Sistema de Etiquetas

### Seleção de Cor

**Estado: Botão de Cor**
```
Cor: [🔴] [🟡] [🟢] [🔵] [+]
```

**Click em Cor Existente:**
- Cor selecionada fica com borda destacada
- Animação: scale(1.0) → 1.1 → 1.0 (200ms)
- Feedback tátil (se suportado)

**Click em "+":**
- Color picker abre (modal pequeno)
- Opções: Paleta predefinida ou input hex
- Preview da cor selecionada
- Botão "Confirmar"

### Adicionar Etiqueta a Tarefa

**Estado 1: Sem Etiquetas**
```
Etiquetas: [+ Adicionar]
```

**Estado 2: Com Etiquetas**
```
Etiquetas: [🔴 Urgente ×] [🟡 Frontend ×] [+ Adicionar]
```

**Click em "+ Adicionar":**
- Dropdown abre com lista de etiquetas
- Search box no topo para filtrar
- Checkbox ao lado de cada etiqueta
- Seleção múltipla possível
- Botão "Aplicar" confirma

**Adição Bem-Sucedida:**
- Novas etiquetas aparecem com animação:
  - Fade-in + slide-in (translateX(-10px) → 0)
  - Duração: 200ms

**Remoção (×):**
- Hover: Badge fica com fundo mais escuro
- Click em ×: Badge desaparece com fade-out (150ms)
- Toast: "Etiqueta removida" (opcional)

---

## 6. Protótipo: Feedback de Ações

### Toast Notifications

**Posicionamento:**
- Canto superior direito (desktop)
- Topo centralizado (mobile)
- Stack vertical (múltiplos toasts)

**Tipos:**

**Sucesso:**
```
┌──────────────────────────┐
│ ✓  Tarefa criada!       │  ← Verde
└──────────────────────────┘
```
- Cor: Verde (#10b981)
- Ícone: Checkmark
- Auto-dismiss: 3 segundos

**Erro:**
```
┌──────────────────────────┐
│ ✕  Erro ao salvar       │  ← Vermelho
└──────────────────────────┘
```
- Cor: Vermelho (#ef4444)
- Ícone: X
- Auto-dismiss: 5 segundos (mais tempo para ler)

**Info:**
```
┌──────────────────────────┐
│ ℹ  Tarefa movida        │  ← Azul
└──────────────────────────┘
```
- Cor: Azul (#3b82f6)
- Ícone: Info
- Auto-dismiss: 3 segundos

**Animação de Entrada:**
- Slide-in da direita (translateX(100%) → 0)
- Fade-in (opacity 0 → 1)
- Duração: 300ms ease-out

**Animação de Saída:**
- Fade-out (opacity 1 → 0)
- Scale-down (scale 1 → 0.95)
- Duração: 200ms ease-in

### Loading States

**Botão com Loading:**
```
[⏳ Salvando...]  ← Botão desabilitado, spinner
```

**Skeleton Screens:**
```
┌──────────────────┐
│ ░░░░░░░░░░░░░░░░ │  ← Skeleton do card
│ ░░░░░░░░░░░░░░░░ │
└──────────────────┘
```
- Animação: Pulse (opacity 0.4 → 0.8 → 0.4)
- Duração: 1.5s loop

**Spinner Global:**
- Centrado na tela
- Backdrop semi-transparente
- Texto opcional: "Carregando..."

---

## 7. Protótipo: Busca e Filtros

### Busca Global

**Estado: Campo Fechado**
```
[🔍]  ← Ícone de busca no header
```

**Click no Ícone:**
- Campo expande (width: 0 → 300px)
- Input recebe foco
- Placeholder: "Buscar tarefas, projetos..."

**Durante a Digitação:**
- Debounce de 300ms antes de buscar
- Loading indicator no campo (spinner pequeno)
- Resultados aparecem em dropdown abaixo

**Resultados:**
```
┌────────────────────────────────┐
│ Resultados (5)                 │
├────────────────────────────────┤
│ 📋 Tarefa: Implementar login   │
│    Projeto: Alpha → To Do      │
├────────────────────────────────┤
│ 📁 Projeto: Beta               │
│    12 tarefas                  │
└────────────────────────────────┘
```

**Seleção:**
- Click em resultado → Navega para item
- Keyboard: Arrow keys navegam, Enter seleciona
- Esc fecha dropdown

### Filtros na Lista

**Estado: Filtros Colapsados**
```
[Filtros ▼]
```

**Estado: Filtros Expandidos**
```
┌─────────────────────────────┐
│ Filtros                     │
├─────────────────────────────┤
│ Etapa: [Todas ▼]           │
│ Etiqueta: [Todas ▼]        │
│ Status: [Todas ▼]          │
│                             │
│ [Aplicar] [Limpar]         │
└─────────────────────────────┘
```

**Aplicação de Filtros:**
- Click em "Aplicar"
- Loading sutil
- Lista atualiza com animação fade
- Badges de filtros ativos aparecem acima da lista

---

## 8. Protótipo: Responsividade

### Desktop (> 1024px)
- Layout completo
- Drawer lateral (40% da largura)
- Múltiplas colunas visíveis no Kanban
- Hover states ativos

### Tablet (768px - 1024px)
- Layout adaptado
- Drawer ocupa 60% da largura
- Kanban com scroll horizontal se necessário
- Touch-friendly (botões maiores)

### Mobile (< 768px)
- Layout em pilha
- Drawer full-screen (slide de baixo)
- Kanban com scroll horizontal obrigatório
- Cards menores mas legíveis
- Botões com área de toque mínima 44x44px

**Transição Desktop → Mobile:**
- Breakpoint detectado
- Layout reflui suavemente (300ms)
- Elementos se reposicionam
- Navegação adapta (menu hamburger)

---

## 9. Protótipo: Estados de Erro

### Erro de Validação (Formulário)

**Campo Inválido:**
```
┌─────────────────────────┐
│ [Título_____________]   │  ← Borda vermelha
│ ⚠ Título é obrigatório │  ← Mensagem abaixo
└─────────────────────────┘
```

**Animação:**
- Borda fica vermelha (200ms)
- Mensagem aparece com slide-down (300ms)
- Campo "shake" leve (100ms)

### Erro de Rede

**Modal de Erro:**
```
┌──────────────────────────────┐
│ [×]  Erro de Conexão         │
├──────────────────────────────┤
│                              │
│  Não foi possível conectar   │
│  ao servidor.                │
│                              │
│  [Tentar Novamente] [Cancelar]│
└──────────────────────────────┘
```

**Comportamento:**
- Modal aparece com fade-in
- Botão "Tentar Novamente" retry a ação
- "Cancelar" fecha modal e reverte mudanças

### Erro 404 (Não Encontrado)

**Página de Erro:**
```
┌──────────────────────────────┐
│      [Ilustração 404]        │
│                              │
│      Projeto não encontrado  │
│                              │
│   O projeto que você procura │
│   não existe ou foi removido.│
│                              │
│    [Voltar para Projetos]    │
└──────────────────────────────┘
```

---

## 10. Protótipo: Animações de Transição

### Transição de Página

**Navegação entre Projetos:**
1. Página atual: Fade-out (opacity 1 → 0, 200ms)
2. Loading indicator (opcional)
3. Nova página: Fade-in (opacity 0 → 1, 200ms)
4. Total: 400ms

### Carregamento de Dados

**Skeleton → Conteúdo:**
- Skeletons desaparecem com fade-out (200ms)
- Conteúdo aparece com fade-in + slide-up (300ms)
- Stagger effect: Elementos aparecem com delay de 50ms cada

### Atualização de Contadores

**Contador de Tarefas:**
```
(5) → (6)  ← Animação: scale(1.2) → 1.0, cor verde momentânea
```

**Animação:**
- Número escala para 1.2x (100ms)
- Cor muda para verde brevemente
- Retorna ao normal (200ms)

---

## 11. Feedback Tátil (Mobile)

### Haptic Feedback

**Ações com Feedback:**
- Drag iniciado: Vibração leve (10ms)
- Drop bem-sucedido: Vibração média (20ms)
- Erro: Vibração dupla (10ms + 10ms)
- Ação confirmada: Vibração curta (15ms)

### Gestos

**Swipe para Ações (Mobile):**
- Swipe left na tarefa: Revela ações (editar/excluir)
- Swipe right: Fecha ações
- Animação: translateX com spring

---

## 12. Performance e Otimizações

### Lazy Loading

**Imagens e Componentes:**
- Componentes pesados carregam apenas quando visíveis
- Imagens com lazy loading nativo
- Virtualização de listas longas (100+ itens)

### Debouncing

**Inputs de Busca:**
- Debounce de 300ms antes de buscar
- Evita requisições excessivas

**Resize Handler:**
- Debounce de 250ms
- Reduz recálculos de layout

### Throttling

**Scroll Events:**
- Throttle de 100ms
- Otimiza performance em scroll rápido

---

## 13. Testes de Interatividade

### Cenários de Teste

1. **Drag and Drop:**
   - Arrastar tarefa para outra coluna
   - Arrastar tarefa para mesma posição
   - Arrastar para área inválida
   - Arrastar múltiplas tarefas rapidamente

2. **Criação de Tarefa:**
   - Criar tarefa válida
   - Tentar criar tarefa vazia
   - Criar múltiplas tarefas rapidamente
   - Cancelar criação

3. **Modal/Drawer:**
   - Abrir e fechar
   - Editar e salvar
   - Editar e cancelar (com mudanças)
   - Fechar com ESC

4. **Responsividade:**
   - Redimensionar janela
   - Testar em diferentes tamanhos
   - Verificar touch targets no mobile

---

## 14. Ferramentas de Prototipagem Recomendadas

### Para Validação Rápida
- **Figma**: Protótipos interativos básicos
- **Adobe XD**: Animações e micro-interações

### Para Prototipagem Avançada
- **Framer**: Interações complexas e código
- **Principle**: Animações detalhadas

### Para Desenvolvimento
- **Storybook**: Componentes isolados
- **React Prototypes**: Protótipos funcionais com código real

---

## 15. Próximos Passos

1. **Implementar Protótipos**
   - Criar protótipos em Figma/Framer
   - Testar interações principais
   - Validar animações

2. **Testes de Usabilidade**
   - Testar com usuários reais
   - Validar intuitividade
   - Identificar problemas

3. **Refinamento**
   - Ajustar baseado em feedback
   - Otimizar performance
   - Polir animações

4. **Handoff para Desenvolvimento**
   - Documentar especificações técnicas
   - Fornecer assets e animações
   - Estabelecer sistema de design






