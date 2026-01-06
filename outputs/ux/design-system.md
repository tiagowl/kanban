# Design System - Sistema Kanban

## Visão Geral

Este documento define o sistema de design do Sistema Kanban, baseado em Shadcn UI e seguindo as melhores práticas de design moderno. O design system garante consistência visual e de interação em toda a aplicação.

---

## 1. Princípios de Design

### Simplicidade
- Interface limpa e sem elementos desnecessários
- Foco no conteúdo e funcionalidades essenciais
- Redução de ruído visual

### Clareza
- Hierarquia visual bem definida
- Feedback imediato em todas as ações
- Mensagens e labels descritivos

### Consistência
- Componentes reutilizáveis
- Padrões de interação uniformes
- Linguagem visual coesa

### Acessibilidade
- Contraste adequado em todos os elementos
- Navegação por teclado funcional
- Suporte a screen readers

### Performance
- Animações leves e otimizadas
- Loading states claros
- Feedback visual responsivo

---

## 2. Paleta de Cores

### Cores Primárias

**Baseada no Shadcn UI padrão (modo claro/escuro suportado):**

#### Modo Claro
```
Primária:    hsl(222.2 47.4% 11.2%)  → #0f172a (slate-900)
Secundária:  hsl(210 40% 98%)        → #f8fafc (slate-50)
Accent:      hsl(217.2 32.6% 17.5%)  → #1e293b (slate-800)
Background:  hsl(0 0% 100%)          → #ffffff
Foreground:  hsl(222.2 84% 4.9%)     → #0c0a09
```

#### Modo Escuro
```
Primária:    hsl(210 40% 98%)        → #f8fafc
Secundária:  hsl(217.2 32.6% 17.5%)  → #1e293b
Accent:      hsl(217.2 32.6% 17.5%)  → #1e293b
Background:  hsl(222.2 84% 4.9%)     → #0c0a09
Foreground:  hsl(210 40% 98%)        → #f8fafc
```

### Cores Semânticas

**Sucesso (Green)**
```css
--success: hsl(142.1 76.2% 36.3%)    /* #10b981 */
--success-foreground: hsl(355.7 100% 97.3%)
--success-light: hsl(142.1 70.6% 45.3%)
--success-dark: hsl(142.1 84.2% 20.4%)
```

**Erro (Red)**
```css
--error: hsl(0 84.2% 60.2%)          /* #ef4444 */
--error-foreground: hsl(0 0% 98%)
--error-light: hsl(0 91.7% 71.8%)
--error-dark: hsl(0 72.2% 50.6%)
```

**Aviso (Yellow/Amber)**
```css
--warning: hsl(43.3 96.4% 56.3%)     /* #f59e0b */
--warning-foreground: hsl(20 14.3% 4.1%)
--warning-light: hsl(45.4 93.4% 47.5%)
--warning-dark: hsl(35.5 91.7% 32.9%)
```

**Info (Blue)**
```css
--info: hsl(217.2 91.2% 59.8%)       /* #3b82f6 */
--info-foreground: hsl(0 0% 98%)
--info-light: hsl(213.1 93.9% 68.4%)
--info-dark: hsl(222.2 47.4% 11.2%)
```

### Cores de Etiquetas

**Paleta Predefinida para Etiquetas:**
```css
--label-red:     #ef4444  /* Urgente, Bloqueado */
--label-orange:  #f97316  /* Alta Prioridade */
--label-amber:   #f59e0b  /* Atenção */
--label-yellow:  #eab308  /* Média Prioridade */
--label-lime:    #84cc16  /* Em Progresso */
--label-green:   #10b981  /* Concluído, Baixa Prioridade */
--label-emerald: #059669  /* Aprovado */
--label-teal:    #14b8a6  /* Em Revisão */
--label-cyan:    #06b6d4  /* Informação */
--label-blue:    #3b82f6  /* Planejado */
--label-indigo:  #6366f1  /* Backend */
--label-violet:  #8b5cf6  /* Frontend */
--label-purple:  #a855f7  /* Design */
--label-fuchsia: #d946ef  /* Teste */
--label-pink:    #ec4899  /* Bug */
--label-rose:    #f43f5e  /* Crítico */
```

**Uso:**
- Cada etiqueta pode ter uma cor da paleta
- Cores devem ser consistentes (mesma cor = mesma categoria)
- Contraste mínimo: 4.5:1 com texto branco/preto

---

## 3. Tipografia

### Fontes

**Família Principal:**
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'Fira Code', 'Courier New', monospace;
```

**Inter** para interface (legível, moderna, versátil)  
**Fira Code** para código (quando necessário)

### Escala Tipográfica

```css
/* Headings */
--text-h1: 2.25rem;   /* 36px */  font-weight: 700; line-height: 1.2
--text-h2: 1.875rem;  /* 30px */  font-weight: 600; line-height: 1.3
--text-h3: 1.5rem;    /* 24px */  font-weight: 600; line-height: 1.4
--text-h4: 1.25rem;   /* 20px */  font-weight: 600; line-height: 1.4
--text-h5: 1.125rem;  /* 18px */  font-weight: 600; line-height: 1.5
--text-h6: 1rem;      /* 16px */  font-weight: 600; line-height: 1.5

/* Body */
--text-base: 1rem;    /* 16px */  font-weight: 400; line-height: 1.5
--text-sm: 0.875rem;  /* 14px */  font-weight: 400; line-height: 1.5
--text-xs: 0.75rem;   /* 12px */  font-weight: 400; line-height: 1.4

/* Special */
--text-label: 0.875rem; /* 14px */ font-weight: 500; line-height: 1.4
--text-caption: 0.75rem; /* 12px */ font-weight: 400; line-height: 1.3
```

### Uso por Contexto

**Headings:**
- H1: Títulos de página principais
- H2: Seções importantes
- H3: Subseções
- H4-H6: Títulos de cards, modais

**Body:**
- Base: Texto principal, parágrafos
- Sm: Texto secundário, descrições
- Xs: Texto auxiliar, timestamps

**Special:**
- Label: Labels de formulário, badges
- Caption: Rodapés, notas, ajuda

---

## 4. Espaçamento

### Sistema de Grid (Base 4px)

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### Uso

**Padding em Componentes:**
- Cards: `padding: var(--space-4)`
- Botões: `padding: var(--space-2) var(--space-4)`
- Inputs: `padding: var(--space-3) var(--space-4)`

**Margin entre Elementos:**
- Elementos relacionados: `margin-bottom: var(--space-4)`
- Seções: `margin-bottom: var(--space-8)`
- Cards em grid: `gap: var(--space-4)`

---

## 5. Componentes Base (Shadcn UI)

### Button

**Variantes:**
```typescript
variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
size: "default" | "sm" | "lg" | "icon"
```

**Estados:**
- Default: Cor primária, fundo sólido
- Hover: Escurece 10%
- Active: Escurece 20%
- Disabled: Opacidade 50%, cursor not-allowed
- Loading: Spinner + texto "Carregando..."

**Uso:**
- Primary actions: `variant="default"`
- Secondary actions: `variant="outline"`
- Destructive: `variant="destructive"`
- Icon-only: `size="icon"`

### Input

**Estados:**
- Default: Borda sutil
- Focus: Borda primária, outline ring
- Error: Borda vermelha, mensagem abaixo
- Disabled: Fundo cinza, cursor not-allowed

**Variantes:**
```typescript
type: "text" | "email" | "password" | "number" | "search"
variant: "default" | "error"
```

### Card

**Estrutura:**
```tsx
<Card>
  <CardHeader> {/* Título e descrição */}
  <CardContent> {/* Conteúdo principal */}
  <CardFooter> {/* Ações */}
</Card>
```

**Uso:**
- Cards de projeto: Header + Content (tarefas)
- Cards de tarefa: Content compacto
- Modals: Card com overlay

### Badge

**Variantes:**
```typescript
variant: "default" | "secondary" | "destructive" | "outline"
```

**Uso:**
- Etiquetas: Badge colorido
- Status: Badge com ícone
- Contadores: Badge numérico

### Dialog / Sheet

**Dialog (Modal Centralizado):**
- Overlay: 50% opacity
- Tamanho: max-width 500px
- Animação: Fade + scale

**Sheet (Drawer Lateral):**
- Posição: Right (desktop), Bottom (mobile)
- Largura: 40% (desktop), 100% (mobile)
- Animação: Slide-in

### Toast

**Posição:** Top-right (desktop), Top-center (mobile)  
**Duração:** 3s (sucesso), 5s (erro)  
**Animação:** Slide-in + fade

**Variantes:**
- Success: Verde + ícone check
- Error: Vermelho + ícone X
- Info: Azul + ícone info
- Warning: Amarelo + ícone alerta

---

## 6. Componentes Customizados

### KanbanColumn

**Estrutura:**
```tsx
<KanbanColumn>
  <ColumnHeader>
    <ColumnTitle>{stage.name}</ColumnTitle>
    <ColumnCount>{tasks.length}</ColumnCount>
  </ColumnHeader>
  <ColumnContent>
    {tasks.map(task => <TaskCard key={task.id} {...task} />)}
    <AddTaskButton />
  </ColumnContent>
</KanbanColumn>
```

**Estilos:**
- Background: `var(--secondary)`
- Border-radius: `var(--radius-lg)`
- Padding: `var(--space-4)`
- Min-width: `280px`
- Max-height: `calc(100vh - 200px)`
- Overflow-y: `auto`

### TaskCard

**Estrutura:**
```tsx
<TaskCard draggable>
  <TaskTitle>{task.title}</TaskTitle>
  <TaskLabels>{labels}</TaskLabels>
  <TaskSubtasks>{subtasks}</TaskSubtasks>
</TaskCard>
```

**Estilos:**
- Background: `var(--background)`
- Border: `1px solid var(--border)`
- Border-radius: `var(--radius-md)`
- Padding: `var(--space-3)`
- Margin-bottom: `var(--space-2)`
- Cursor: `grab` (active: `grabbing`)
- Hover: Elevation (shadow)
- Drag: Opacity 50%, scale 1.05

### LabelBadge

**Estrutura:**
```tsx
<LabelBadge color={label.color}>
  <LabelDot />
  <LabelText>{label.name}</LabelText>
</LabelBadge>
```

**Estilos:**
- Display: `inline-flex`
- Align-items: `center`
- Gap: `var(--space-1)`
- Padding: `var(--space-1) var(--space-2)`
- Border-radius: `var(--radius-full)`
- Background: `var(--label-color)` com opacidade 20%
- Color: `var(--label-color)`
- Font-size: `var(--text-xs)`

---

## 7. Ícones (Lucide Icons)

### Ícones Principais

**Navegação:**
- `Home`: Dashboard
- `LayoutDashboard`: Visualização geral
- `Menu`: Menu mobile
- `ChevronRight`: Navegação hierárquica

**Ações:**
- `Plus`: Adicionar/criar
- `Edit`: Editar
- `Trash2`: Excluir
- `Save`: Salvar
- `X`: Fechar/cancelar

**Tarefas:**
- `CheckCircle2`: Concluído
- `Circle`: Pendente
- `ListChecks`: Sub-tarefas
- `Tag`: Etiquetas
- `Move`: Drag handle

**Visualização:**
- `LayoutGrid`: Kanban
- `List`: Lista
- `Search`: Buscar
- `Filter`: Filtrar

**Status:**
- `AlertCircle`: Aviso/erro
- `CheckCircle`: Sucesso
- `Info`: Informação
- `Loader2`: Loading

### Tamanhos Padrão

```css
--icon-sm: 1rem;   /* 16px */
--icon-md: 1.25rem; /* 20px */
--icon-lg: 1.5rem;  /* 24px */
--icon-xl: 2rem;    /* 32px */
```

### Uso

- Botões: `icon-md`
- Headers: `icon-lg`
- Cards: `icon-sm`
- Ilustrações: `icon-xl`

---

## 8. Sombras e Elevação

### Sistema de Elevação

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Uso por Contexto

- **sm**: Elementos sutis, borders
- **md**: Cards padrão, inputs focados
- **lg**: Modais, dropdowns
- **xl**: Drawers, popovers grandes
- **2xl**: Overlays, elementos flutuantes

### Estados Interativos

- **Hover**: Eleva 1 nível (ex: md → lg)
- **Active/Pressed**: Reduz elevação (ex: lg → md)
- **Drag**: Elevação máxima (xl ou 2xl)

---

## 9. Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-full: 9999px;   /* Circular */
```

### Uso

- **sm**: Elementos pequenos (badges, chips)
- **md**: Botões, inputs padrão
- **lg**: Cards, modais
- **xl**: Containers grandes
- **full**: Badges circulares, avatares

---

## 10. Animações e Transições

### Durações Padrão

```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Easing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.4, 0.0, 0.2, 1.0);
```

### Animações Comuns

**Fade:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide:**
```css
@keyframes slideDown {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

**Scale:**
```css
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

**Pulse (Loading):**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Uso por Contexto

- **Hover**: `var(--duration-fast) var(--ease-out)`
- **Click/Press**: `var(--duration-base) var(--ease-out)`
- **Modal/Drawer**: `var(--duration-slow) var(--ease-out)`
- **Loading**: `var(--duration-slower) infinite var(--ease-in-out)`

---

## 11. Estados de Interação

### Hover

**Elementos Interativos:**
- Opacity: `1` → `0.9`
- Transform: `scale(1)` → `scale(1.02)` (opcional)
- Elevation: Aumenta 1 nível
- Cursor: `pointer`

### Active/Pressed

**Botões, Cards Clicáveis:**
- Opacity: `1` → `0.8`
- Transform: `scale(1)` → `scale(0.98)`
- Elevation: Reduz 1 nível
- Transition: `100ms`

### Focus

**Inputs, Botões:**
- Outline: `2px solid var(--primary)`
- Outline-offset: `2px`
- Ring: `0 0 0 3px var(--primary)` com 20% opacity

### Disabled

**Botões, Inputs Desabilitados:**
- Opacity: `0.5`
- Cursor: `not-allowed`
- Pointer-events: `none`
- Filter: `grayscale(20%)`

### Loading

**Estados de Carregamento:**
- Spinner animado (rotating)
- Opacity reduzida (0.7)
- Cursor: `wait`
- Texto: "Carregando..." ou spinner apenas

---

## 12. Layout e Grid

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Container

**Largura Máxima:**
- Mobile: `100%` (sem container)
- Tablet: `768px`
- Desktop: `1280px`
- Large: `1536px`

**Padding Lateral:**
- Mobile: `var(--space-4)`
- Desktop: `var(--space-6)`

### Grid System

**Kanban:**
- Colunas: Auto (baseado em etapas)
- Gap: `var(--space-4)`
- Scroll: Horizontal se necessário

**Lista de Projetos:**
- Grid: Responsivo
- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3-4 colunas
- Gap: `var(--space-4)`

---

## 13. Acessibilidade

### Contraste

**Textos:**
- Normal: Mínimo `4.5:1`
- Large (18px+): Mínimo `3:1`
- Componentes: Mínimo `3:1`

**Ferramenta de Teste:** WebAIM Contrast Checker

### Navegação por Teclado

**Ordem de Tabulação:**
- Lógica (top → bottom, left → right)
- Indicadores de foco sempre visíveis
- Skip links para conteúdo principal

**Atalhos:**
- `Tab`: Próximo elemento
- `Shift + Tab`: Elemento anterior
- `Enter/Space`: Ativar elemento
- `Esc`: Fechar modais/dropdowns

### Screen Readers

**ARIA Labels:**
- Botões icon-only têm `aria-label`
- Estados dinâmicos têm `aria-live`
- Modais têm `role="dialog"` e `aria-modal`

**Estrutura Semântica:**
- HTML5 semântico (`header`, `nav`, `main`, `footer`)
- Landmarks apropriados
- Headings hierárquicos

---

## 14. Modo Escuro

### Suporte

**Toggle:**
- Botão no header
- Preferência salva (localStorage)
- Respeita `prefers-color-scheme` do sistema

### Adaptações

**Cores:**
- Todas as cores têm variantes para dark mode
- Backgrounds: Invertidos
- Textos: Invertidos
- Bordas: Ajustadas para contraste

**Componentes:**
- Cards: Background mais escuro
- Inputs: Background escuro, borda sutil
- Modals: Background escuro com overlay

### Implementação

Usar variáveis CSS com `prefers-color-scheme` ou toggle manual:

```css
:root[data-theme="dark"] {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
  /* ... outras cores */
}
```

---

## 15. Responsividade

### Mobile First

**Abordagem:**
- Design para mobile primeiro
- Progressive enhancement para desktop
- Breakpoints mínimos, não máximos

### Adaptações por Tela

**Mobile (< 768px):**
- Layout em pilha
- Menu hamburger
- Drawer full-screen
- Botões maiores (44x44px mínimo)
- Texto legível sem zoom

**Tablet (768px - 1024px):**
- Layout híbrido
- Sidebar colapsável
- Cards em grid 2 colunas
- Touch-friendly

**Desktop (> 1024px):**
- Layout completo
- Sidebar fixa
- Hover states ativos
- Múltiplas colunas

---

## 16. Tokens de Design

### Organização

Todos os valores são definidos como variáveis CSS:

```css
:root {
  /* Colors */
  --color-primary: ...;
  
  /* Typography */
  --font-sans: ...;
  --text-base: ...;
  
  /* Spacing */
  --space-4: ...;
  
  /* Shadows */
  --shadow-md: ...;
  
  /* etc. */
}
```

### Uso em Componentes

```css
.button {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  background: var(--color-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-base) var(--ease-out);
}
```

---

## 17. Guia de Uso dos Componentes

### Quando Usar Cada Componente

**Button:**
- Ações principais: `variant="default"`
- Ações secundárias: `variant="outline"`
- Ações destrutivas: `variant="destructive"`
- Navegação: `variant="link"`

**Card:**
- Agrupar conteúdo relacionado
- Visualização de projetos/tarefas
- Containers de formulários

**Dialog:**
- Confirmações importantes
- Formulários complexos
- Informações detalhadas

**Sheet:**
- Detalhes de tarefa
- Configurações
- Sidebars mobile

**Toast:**
- Feedback de ações (sucesso/erro)
- Notificações não-bloqueantes
- Informações temporárias

---

## 18. Best Practices

### Performance

- Usar CSS transforms para animações (não position)
- Lazy load de componentes pesados
- Debounce/throttle em eventos frequentes
- Otimizar imagens (WebP, lazy loading)

### Consistência

- Sempre usar componentes do design system
- Não criar variações sem necessidade
- Documentar exceções
- Manter padrões de nomenclatura

### Acessibilidade

- Testar com screen readers
- Validar contraste
- Garantir navegação por teclado
- Usar HTML semântico

---

## 19. Recursos e Ferramentas

### Design Tools

- **Figma**: Design e prototipagem
- **Shadcn UI**: Biblioteca de componentes base
- **Lucide Icons**: Biblioteca de ícones

### Desenvolvimento

- **Tailwind CSS**: Framework CSS (se usar com Shadcn)
- **CSS Variables**: Sistema de tokens
- **Storybook**: Documentação de componentes

### Testes

- **Lighthouse**: Performance e acessibilidade
- **Wave**: Validação de acessibilidade
- **Browser DevTools**: Debugging visual

---

## 20. Manutenção e Evolução

### Versionamento

- Design system versionado separadamente
- Breaking changes documentados
- Migration guides para atualizações

### Contribuição

- Mudanças propostas via PR
- Review por time de design
- Testes antes de merge
- Documentação atualizada

### Roadmap

**V1.0 (MVP):**
- Componentes básicos
- Modo claro
- Responsividade desktop/tablet

**V1.1:**
- Modo escuro completo
- Componentes avançados
- Temas customizáveis

**V2.0:**
- Design tokens avançados
- Micro-interações refinadas
- Animações complexas

---

## 21. Checklist de Implementação

### Componentes Base
- [ ] Button (todas as variantes)
- [ ] Input (todos os tipos e estados)
- [ ] Card
- [ ] Badge
- [ ] Dialog/Sheet
- [ ] Toast
- [ ] Dropdown/Menu
- [ ] Toggle/Switch
- [ ] Checkbox
- [ ] Radio

### Componentes Customizados
- [ ] KanbanColumn
- [ ] TaskCard
- [ ] LabelBadge
- [ ] ProjectCard
- [ ] SearchInput
- [ ] FilterPanel

### Sistema
- [ ] Variáveis CSS configuradas
- [ ] Tema claro funcionando
- [ ] Tema escuro funcionando
- [ ] Breakpoints definidos
- [ ] Animações implementadas
- [ ] Acessibilidade validada

---

## 22. Referências

### Documentação Oficial
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Guias de Acessibilidade
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)

### Inspiração
- [Linear](https://linear.app/)
- [Notion](https://www.notion.so/)
- [Trello](https://trello.com/)

---

## Conclusão

Este design system fornece as bases para uma interface consistente, acessível e bonita. Ele deve ser evoluído conforme o produto cresce, sempre mantendo os princípios fundamentais de simplicidade, clareza e consistência.

**Próximos Passos:**
1. Implementar componentes base
2. Validar com testes de usabilidade
3. Refinar baseado em feedback
4. Documentar padrões de uso
5. Manter design system atualizado


