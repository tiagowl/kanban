# Protótipos Interativos - Sistema Kanban

## 1. Visão Geral

Este documento descreve as especificações detalhadas para protótipos interativos do sistema Kanban, incluindo interações funcionais, estados da interface, transições e feedback visual.

**Fidelidade:** Protótipos de média/alta fidelidade com interações funcionais simuladas.

---

## 2. Principais Interações

### 2.1 Drag and Drop de Tarefas

#### Interação: Arrastar Tarefa Dentro da Mesma Etapa

**Estado Inicial:**
- Card estático na posição normal
- Cursor padrão ao hover

**Durante o Drag:**
```
1. Mouse Down / Touch Start
   - Cursor muda para "grabbing" (mão fechada)
   - Card fica semitransparente (opacity: 0.7)
   - Card aumenta levemente (scale: 1.05)
   - Sombra aumenta (box-shadow mais pronunciada)
   - Card "flutua" seguindo o cursor/dedo

2. Mouse Move / Touch Move
   - Card segue movimento suavemente
   - Indicador visual mostra posição de inserção
   - Outros cards se movem para dar espaço
   - Animação suave de reorganização

3. Hover sobre Posição Válida
   - Linha indicadora aparece entre cards
   - Área de drop é destacada levemente
   - Feedback visual claro

4. Hover sobre Posição Inválida
   - Card volta ao estado normal
   - Nenhum indicador aparece
```

**Estado Final:**
```
1. Mouse Up / Touch End em Posição Válida
   - Card se move suavemente para nova posição
   - Outros cards se reorganizam
   - Animação de "settle" (leve bounce)
   - Opacity volta para 1.0
   - Toast notification: "Tarefa reordenada"
   - API call em background

2. Mouse Up / Touch End em Posição Inválida
   - Card retorna suavemente para posição original
   - Animação de "snap back"
   - Nenhuma alteração persistida

3. Cancelamento (ESC ou soltar fora)
   - Card retorna para posição original
   - Animação de retorno
```

**Especificações Técnicas:**
- **Transição:** 200ms ease-out para movimentos
- **Delay de Início:** 100ms antes de iniciar drag (evita acionamento acidental)
- **Threshold:** Mover pelo menos 5px antes de considerar drag
- **Z-index:** Card arrastado: 1000, outros cards: 1

---

#### Interação: Arrastar Tarefa entre Etapas

**Estado Inicial:**
- Card estático na coluna de origem
- Cursor padrão

**Durante o Drag:**
```
1. Mouse Down / Touch Start
   - Mesmo comportamento do drag interno
   - Card fica "flutuando"

2. Arrastar para Fora da Coluna
   - Card continua seguindo cursor
   - Cursor muda para "move" ou "hand"
   - Colunas próximas mostram área de drop

3. Hover sobre Coluna Válida
   - Coluna inteira é destacada (borda colorida)
   - Sombra na coluna indica área de drop
   - Indicador visual no final da lista de tarefas
   - Feedback: "Solte aqui para mover para [Nome Etapa]"

4. Hover sobre Coluna Inválida
   - Nenhum feedback especial
   - Card continua flutuando
```

**Estado Final:**
```
1. Soltar em Coluna Válida
   - Card desaparece da coluna origem (fade out 150ms)
   - Card aparece na coluna destino (fade in 150ms)
   - Posição: final da lista (ou posição indicada)
   - Toast notification: "Tarefa movida para [Etapa]"
   - API call atualiza tarefa.etapa_id
   - Otimistic update (se API falhar, reverte)

2. Soltar em Área Inválida
   - Card retorna para coluna origem
   - Animação de snap back
   - Toast notification: "Operação cancelada"
```

**Especificações Técnicas:**
- **Animação de Movimento:** 300ms ease-in-out
- **Feedback Visual:** Borda de 3px na cor primária ao hover
- **Z-index:** Card arrastado: 1000, colunas: 10

---

### 2.2 Criação Rápida de Tarefas

#### Interação: Adicionar Tarefa Inline

**Estado Inicial:**
- Botão "[+ Adicionar Tarefa]" visível no final da coluna
- Ao hover: leve destaque visual

**Ao Clicar:**
```
1. Clique no Botão
   - Botão se expande suavemente (200ms)
   - Transforma em input field
   - Input recebe foco automaticamente
   - Placeholder: "Digite o título da tarefa..."

2. Durante Digitação
   - Input cresce conforme conteúdo (multiline se necessário)
   - Botão "Criar" aparece abaixo do input
   - Botão "Cancelar" (X) aparece ao lado

3. Ao Pressionar Enter
   - Valida título não vazio
   - Se válido: cria tarefa, fecha input, mostra card novo
   - Se inválido: shake animation no input

4. Ao Clicar Fora ou Cancelar
   - Input colapsa de volta ao botão
   - Conteúdo é descartado
```

**Especificações:**
- **Animação:** 200ms ease-in-out para expand/collapse
- **Validação:** Em tempo real
- **Feedback:** Card aparece com fade-in + slide-down

---

### 2.3 Modal de Detalhes da Tarefa

#### Interação: Abrir Modal

**Estado Inicial:**
- Card estático no board

**Ao Clicar no Card:**
```
1. Clique no Card
   - Overlay aparece com fade-in (200ms, opacity 0→0.5)
   - Modal aparece com slide-up + fade-in (300ms)
   - Modal vem do centro da tela (scale: 0.95 → 1.0)
   - Foco move para dentro do modal
   - Body scroll é desabilitado

2. Modal Aberto
   - Overlay bloqueia interação com background
   - Modal está centralizado
   - Conteúdo carregado (tarefa + subtarefas)
   - Botão fechar (X) no canto superior direito
```

**Especificações:**
- **Animação de Entrada:** 300ms ease-out
- **Overlay:** rgba(0, 0, 0, 0.5) com blur leve (backdrop-filter)
- **Modal Size:** Max-width 600px, max-height 90vh

---

#### Interação: Edição Inline de Subtarefas

**Estado Inicial:**
- Subtarefa exibida como texto com checkbox

**Ao Clicar no Texto:**
```
1. Clique no Texto
   - Texto se transforma em input (smooth transition)
   - Input recebe foco e seleciona todo o texto
   - Botão "Salvar" e "Cancelar" aparecem

2. Durante Edição
   - Input cresce conforme conteúdo
   - Validação em tempo real (não pode ser vazio)

3. Ao Confirmar (Enter ou Salvar)
   - Input se transforma de volta em texto
   - Texto atualizado com fade-in
   - API call em background (debounce 500ms)
   - Feedback visual sutil de salvamento

4. Ao Cancelar (ESC ou Cancelar)
   - Input reverte para texto original
   - Nenhuma alteração persistida
```

**Especificações:**
- **Transição:** 150ms ease-in-out
- **Debounce:** 500ms para salvamento automático
- **Feedback:** Ícone de check sutil ao salvar

---

#### Interação: Checkbox de Subtarefa

**Estado Inicial:**
- Checkbox desmarcado, texto normal

**Ao Clicar no Checkbox:**
```
1. Clique
   - Checkbox marca instantaneamente (feedback imediato)
   - Animação de check (scale: 0 → 1.2 → 1.0, 200ms)
   - Texto ganha strikethrough (line-through)
   - Opacity do texto reduz para 0.6
   - Contador de progresso atualiza
   - API call em background

2. Se API Falhar
   - Checkbox desmarca
   - Toast notification de erro
   - Texto volta ao normal
```

**Especificações:**
- **Animação de Check:** 200ms bounce
- **Transição de Texto:** 200ms ease-in-out
- **Feedback:** Haptic feedback em dispositivos móveis

---

### 2.4 Formulários

#### Interação: Validação em Tempo Real

**Estado Inicial:**
- Campo vazio, sem erro

**Durante Digitação:**
```
1. Campo Inválido (ex: vazio quando obrigatório)
   - Borda muda para vermelho após 300ms de inatividade
   - Mensagem de erro aparece abaixo do campo
   - Ícone de erro aparece ao lado do campo
   - Botão submit desabilitado

2. Campo Válido
   - Borda muda para verde sutil
   - Mensagem de erro desaparece
   - Ícone de sucesso aparece (opcional)
   - Botão submit habilitado
```

**Especificações:**
- **Delay de Validação:** 300ms após última digitação (debounce)
- **Cores:** Vermelho: #EF4444, Verde: #10B981
- **Animação:** Fade-in/fade-out 200ms

---

#### Interação: Submissão de Formulário

**Estado Inicial:**
- Botão "Criar" ou "Salvar" habilitado

**Ao Clicar:**
```
1. Clique no Botão
   - Botão mostra loading state (spinner)
   - Texto muda para "Criando..." ou "Salvando..."
   - Botão fica desabilitado
   - Campos ficam desabilitados

2. Durante API Call
   - Spinner animado no botão
   - Overlay sutil no formulário (opcional)

3. Sucesso
   - Botão volta ao normal
   - Modal fecha (se aplicável)
   - Toast notification: "Tarefa criada com sucesso!"
   - Item aparece na lista com animação

4. Erro
   - Botão volta ao normal
   - Mensagem de erro aparece no topo do formulário
   - Campos voltam a ficar habilitados
   - Usuário pode tentar novamente
```

**Especificações:**
- **Loading State:** Spinner de 20px, animação 1s linear infinite
- **Toast Duration:** 3 segundos (auto-dismiss)
- **Animação de Entrada (Item Novo):** Slide-down + fade-in 300ms

---

### 2.5 Navegação

#### Interação: Navegação entre Projetos

**Estado Inicial:**
- Lista de projetos no dashboard

**Ao Clicar em Projeto:**
```
1. Clique no Card do Projeto
   - Card tem leve destaque ao hover
   - Ao clicar: transição suave para board
   - Loading state durante carregamento
   - Board aparece com fade-in + slide-in da direita

2. Durante Transição
   - Skeleton screen do board
   - Spinner centralizado (se demorar > 500ms)
```

**Especificações:**
- **Transição de Página:** 300ms ease-in-out
- **Loading Threshold:** Mostrar spinner após 500ms

---

#### Interação: Breadcrumb e Navegação

**Estado Inicial:**
- Breadcrumb mostra: Home > Projeto > (opcional) Etapa

**Ao Clicar no Breadcrumb:**
```
1. Clique em "Home"
   - Transição suave de volta ao dashboard
   - Fade-out do board, fade-in do dashboard

2. Hover sobre Item
   - Underline aparece
   - Cor muda levemente
```

**Especificações:**
- **Hover Effect:** 150ms ease-in-out
- **Transição de Navegação:** 300ms

---

## 3. Estados da Interface

### 3.1 Loading States

#### Skeleton Screens

**Board Kanban:**
```
┌────────────────────────────────────────────────────┐
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │      │
│ │ ░░░░░░ │ │ ░░░░░░ │ │ ░░░░░░ │ │ ░░░░░░ │      │
│ │ ▓▓▓    │ │ ▓▓▓    │ │ ▓▓▓    │ │ ▓▓▓    │      │
│ └────────┘ └────────┘ └────────┘ └────────┘      │
│ ┌────────┐ ┌────────┐ ┌────────┐                 │
│ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │ │ ▓▓▓▓▓▓ │                 │
│ │ ░░░░░░ │ │ ░░░░░░ │ │ ░░░░░░ │                 │
│ └────────┘ └────────┘ └────────┘                 │
└────────────────────────────────────────────────────┘
```

**Animação:** Shimmer effect (gradiente animado da esquerda para direita)
**Duração:** 1.5s linear infinite

---

#### Spinner

**Localizações:**
- Botões durante ações
- Centro da tela durante carregamento de página
- Dentro de modais durante operações

**Especificações:**
- **Tamanho:** 20px (botões), 40px (tela)
- **Cor:** Cor primária do tema
- **Animação:** Rotate 1s linear infinite
- **Acessibilidade:** aria-label="Carregando..."

---

### 3.2 Empty States

#### Projeto Vazio

**Visual:**
```
┌────────────────────────────────────┐
│                                    │
│           📋                       │
│                                    │
│    Nenhuma etapa criada ainda     │
│                                    │
│  Crie sua primeira etapa para     │
│     começar a organizar           │
│                                    │
│    [+ Criar Primeira Etapa]       │
│                                    │
└────────────────────────────────────┘
```

**Especificações:**
- **Ícone:** Ilustração ou emoji grande (80px)
- **Texto:** Mensagem amigável e orientativa
- **CTA:** Botão destacado
- **Animação:** Leve fade-in ao aparecer

---

#### Etapa Vazia

**Visual:**
```
┌─────────────────┐
│   Todo    (0)   │
├─────────────────┤
│                 │
│   Nenhuma       │
│   tarefa        │
│                 │
│ [+ Adicionar]   │
│                 │
└─────────────────┘
```

**Especificações:**
- **Texto:** Simples e direto
- **CTA:** Botão integrado na coluna
- **Altura Mínima:** 200px para facilitar drop

---

### 3.3 Error States

#### Mensagem de Erro no Formulário

**Visual:**
```
┌─────────────────────────────────────┐
│  Título *                           │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  └───────────────────────────────┘ │
│  ⚠️ Este campo é obrigatório       │
└─────────────────────────────────────┘
```

**Especificações:**
- **Cor:** Vermelho (#EF4444)
- **Ícone:** Ícone de alerta ao lado da mensagem
- **Animação:** Shake animation (300ms) no campo ao mostrar erro
- **Posição:** Abaixo do campo, alinhado à esquerda

---

#### Toast de Erro

**Visual:**
```
┌─────────────────────────────────────┐
│ ⚠️ Erro ao salvar tarefa            │
│    Tente novamente                  │
│                            [X]      │
└─────────────────────────────────────┘
```

**Especificações:**
- **Posição:** Canto superior direito (desktop) ou inferior (mobile)
- **Duração:** 5 segundos (erros) vs 3 segundos (sucessos)
- **Animação:** Slide-in da direita + fade-in (300ms)
- **Ação:** Botão X para fechar, ou auto-dismiss

---

### 3.4 Success States

#### Toast de Sucesso

**Visual:**
```
┌─────────────────────────────────────┐
│ ✓ Tarefa criada com sucesso!        │
│                            [X]      │
└─────────────────────────────────────┘
```

**Especificações:**
- **Cor:** Verde (#10B981)
- **Ícone:** Checkmark animado
- **Duração:** 3 segundos
- **Animação:** Slide-in + fade-in (300ms)

---

#### Feedback Visual Sutil

**Ao Salvar:**
- Checkmark pequeno aparece brevemente (500ms)
- Cor do campo muda levemente para verde
- Fade-out suave

**Especificações:**
- **Duração:** 500ms
- **Posição:** Ao lado do campo ou no botão

---

## 4. Transições e Animações

### 4.1 Micro-interações

#### Hover em Cards

```
Estado Normal → Hover
- Elevação: shadow aumenta (0px → 4px)
- Transform: translateY(-2px)
- Duração: 150ms ease-out
```

#### Hover em Botões

```
Estado Normal → Hover
- Background: cor escurece 10%
- Transform: scale(1.02)
- Duração: 150ms ease-out
```

#### Clique em Botões

```
Estado Hover → Active
- Transform: scale(0.98)
- Duração: 100ms ease-in
- Feedback tátil (mobile)
```

---

### 4.2 Animações de Entrada

#### Fade In
- **Uso:** Aparição de elementos novos
- **Duração:** 300ms
- **Easing:** ease-out
- **Opacity:** 0 → 1

#### Slide Down + Fade In
- **Uso:** Tarefas novas aparecendo na lista
- **Duração:** 300ms
- **Easing:** ease-out
- **Transform:** translateY(-10px) → 0
- **Opacity:** 0 → 1

#### Scale In
- **Uso:** Modais abrindo
- **Duração:** 300ms
- **Easing:** ease-out
- **Transform:** scale(0.95) → 1
- **Opacity:** 0 → 1

---

### 4.3 Animações de Saída

#### Fade Out
- **Uso:** Elementos sendo removidos
- **Duração:** 200ms
- **Easing:** ease-in
- **Opacity:** 1 → 0

#### Slide Up + Fade Out
- **Uso:** Tarefas sendo removidas
- **Duração:** 200ms
- **Easing:** ease-in
- **Transform:** translateY(0) → -10px
- **Opacity:** 1 → 0

---

## 5. Feedback Tátil (Mobile)

### 5.1 Haptic Feedback

**Quando Usar:**
- ✅ Ao marcar/desmarcar checkbox
- ✅ Ao completar drag and drop
- ✅ Ao criar item com sucesso
- ✅ Ao ocorrer erro

**Especificações:**
- **Tipo:** Light impact (iOS) / Vibration 10ms (Android)
- **Intensidade:** Baixa (feedback positivo), Média (feedback de ação), Alta (erro)

---

## 6. Performance e Otimização

### 6.1 Otimistic Updates

**Quando Usar:**
- Drag and drop (mover tarefa)
- Marcar/desmarcar subtarefa
- Reordenar tarefas

**Comportamento:**
1. Interface atualiza imediatamente (feedback instantâneo)
2. API call em background
3. Se sucesso: nenhuma ação adicional
4. Se erro: reverter mudança + mostrar erro

---

### 6.2 Debounce e Throttle

**Debounce (300-500ms):**
- Validação de formulários
- Busca/filtro
- Salvamento automático

**Throttle (100ms):**
- Scroll events
- Resize events
- Mouse move durante drag (se necessário)

---

## 7. Acessibilidade em Interações

### 7.1 Navegação por Teclado

**Drag and Drop:**
- Não acessível via teclado nativamente
- Alternativa: Botão "Mover" no menu de contexto
- Atalhos: Setas para reordenar, Enter para mover entre etapas

**Modais:**
- Tab order: campos do formulário → botões de ação → botão fechar
- ESC fecha modal
- Foco trap: foco não sai do modal

**Formulários:**
- Enter submete formulário
- ESC cancela (se aplicável)
- Validação anuncia via aria-live

---

### 7.2 Screen Readers

**Anúncios:**
- "Tarefa movida para [Etapa]" após drag and drop
- "Tarefa criada" após criação
- "Erro ao salvar" em caso de erro

**Estados:**
- aria-busy="true" durante loading
- aria-live="polite" para atualizações não críticas
- aria-live="assertive" para erros

---

## 8. Prototipagem Sugerida

### 8.1 Ferramentas Recomendadas
- **Figma:** Para protótipos de alta fidelidade com interações
- **Framer:** Para protótipos com animações complexas
- **Principle:** Para micro-interações detalhadas
- **CodePen/StackBlitz:** Para protótipos funcionais em código

### 8.2 Fidelidade dos Protótipos

**Baixa Fidelidade (Wireframes):**
- Estrutura e layout básico
- Sem cores ou detalhes visuais

**Média Fidelidade:**
- Cores e tipografia definidos
- Interações básicas funcionais
- Estados principais implementados

**Alta Fidelidade:**
- Design final completo
- Todas as interações funcionais
- Animações e transições refinadas
- Pronto para desenvolvimento

---

## 9. Testes de Protótipo

### 9.1 Cenários de Teste

1. **Criar tarefa do zero até aparecer no board**
2. **Arrastar tarefa entre etapas múltiplas vezes**
3. **Editar subtarefa e ver atualização em tempo real**
4. **Navegar entre projetos e voltar**
5. **Tratar erros de conexão durante operações**

### 9.2 Métricas de Sucesso

- **Tempo para completar tarefa:** < 30 segundos
- **Taxa de erro:** < 5%
- **Satisfação subjetiva:** > 4/5
- **Facilidade de uso:** > 4/5

---

**Fim do Documento**

