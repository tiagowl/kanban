# Design System - Sistema Kanban

## 1. Visão Geral

Este documento define o Design System completo para o Sistema Kanban, incluindo princípios de design, tokens de design, componentes, padrões de uso e guias de estilo.

**Objetivo:** Garantir consistência visual e funcional em todo o sistema, facilitando desenvolvimento e manutenção.

---

## 2. Princípios de Design

### 2.1 Simplicidade
- **Foco no essencial:** Remover elementos desnecessários
- **Clareza visual:** Hierarquia clara de informações
- **Menos é mais:** Interface limpa e minimalista

### 2.2 Consistência
- **Padrões unificados:** Mesmos componentes em contextos similares
- **Comportamento previsível:** Ações similares produzem resultados similares
- **Linguagem visual coesa:** Cores, tipografia e espaçamento consistentes

### 2.3 Feedback
- **Resposta imediata:** Todas as ações têm feedback visual
- **Estados claros:** Loading, success, error sempre visíveis
- **Confirmações sutis:** Informar sem interromper

### 2.4 Acessibilidade
- **Inclusivo:** Acessível para todos os usuários
- **Navegação por teclado:** Funcionalidade completa via teclado
- **Contraste adequado:** WCAG AA mínimo
- **Screen readers:** Compatível com tecnologias assistivas

---

## 3. Tokens de Design

### 3.1 Cores

#### Paleta Primária

```
Primária:
- 50:  #EFF6FF
- 100: #DBEAFE
- 200: #BFDBFE
- 300: #93C5FD
- 400: #60A5FA
- 500: #3B82F6 (Principal)
- 600: #2563EB
- 700: #1D4ED8
- 800: #1E40AF
- 900: #1E3A8A

Secundária (Neutros):
- 50:  #F9FAFB
- 100: #F3F4F6
- 200: #E5E7EB
- 300: #D1D5DB
- 400: #9CA3AF
- 500: #6B7280
- 600: #4B5563
- 700: #374151
- 800: #1F2937
- 900: #111827
```

#### Cores Semânticas

```
Sucesso:
- 500: #10B981
- 600: #059669

Aviso:
- 500: #F59E0B
- 600: #D97706

Erro:
- 500: #EF4444
- 600: #DC2626

Info:
- 500: #3B82F6
- 600: #2563EB
```

#### Uso de Cores

**Primária (#3B82F6):**
- Botões principais
- Links ativos
- Indicadores de foco
- Ações primárias

**Secundária (Neutros):**
- Texto principal: #111827
- Texto secundário: #6B7280
- Bordas: #E5E7EB
- Backgrounds: #F9FAFB

**Semânticas:**
- Sucesso: Confirmações, estados positivos
- Aviso: Avisos, estados de atenção
- Erro: Erros, estados negativos
- Info: Informações neutras

---

### 3.2 Tipografia

#### Família de Fontes

**Primária:** Inter (ou sistema sans-serif como fallback)
- **Rationale:** Moderna, legível, boa para interfaces

**Monospace:** 'Courier New', monospace (para código)

#### Escala Tipográfica

```
Heading 1 (H1):
- Tamanho: 32px / 2rem
- Line-height: 1.2
- Font-weight: 700
- Uso: Títulos principais de página

Heading 2 (H2):
- Tamanho: 24px / 1.5rem
- Line-height: 1.3
- Font-weight: 600
- Uso: Seções principais

Heading 3 (H3):
- Tamanho: 20px / 1.25rem
- Line-height: 1.4
- Font-weight: 600
- Uso: Subseções

Heading 4 (H4):
- Tamanho: 18px / 1.125rem
- Line-height: 1.4
- Font-weight: 600
- Uso: Subtítulos

Body Large:
- Tamanho: 18px / 1.125rem
- Line-height: 1.6
- Font-weight: 400
- Uso: Texto destacado

Body (padrão):
- Tamanho: 16px / 1rem
- Line-height: 1.5
- Font-weight: 400
- Uso: Texto principal

Body Small:
- Tamanho: 14px / 0.875rem
- Line-height: 1.5
- Font-weight: 400
- Uso: Texto secundário, labels

Caption:
- Tamanho: 12px / 0.75rem
- Line-height: 1.4
- Font-weight: 400
- Uso: Metadados, timestamps
```

#### Responsividade

```
Desktop (> 1024px):
- H1: 32px
- H2: 24px
- Body: 16px

Tablet (768px - 1024px):
- H1: 28px
- H2: 22px
- Body: 16px

Mobile (< 768px):
- H1: 24px
- H2: 20px
- Body: 16px
```

---

### 3.3 Espaçamento

#### Sistema de Espaçamento (Base: 4px)

```
0:   0px
1:   4px
2:   8px
3:   12px
4:   16px
5:   20px
6:   24px
8:   32px
10:  40px
12:  48px
16:  64px
20:  80px
24:  96px
```

#### Uso

- **Padding interno de componentes:** 12px (3), 16px (4)
- **Margem entre elementos:** 16px (4), 24px (6)
- **Espaçamento de seções:** 32px (8), 48px (12)
- **Espaçamento de páginas:** 24px (6), 32px (8)

---

### 3.4 Sombras

```
Shadow SM:
- box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)

Shadow (padrão):
- box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)

Shadow MD:
- box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)

Shadow LG:
- box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)

Shadow XL:
- box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

**Uso:**
- Cards: Shadow (padrão)
- Modais: Shadow XL
- Hover states: Shadow MD
- Elevação durante drag: Shadow LG

---

### 3.5 Bordas e Raio

#### Raio de Borda

```
None:    0px
SM:      4px
MD:      8px
LG:      12px
XL:      16px
Full:    9999px (pill)
```

**Uso:**
- Botões: MD (8px)
- Cards: MD (8px)
- Inputs: SM (4px)
- Modais: LG (12px)
- Badges: Full (pill)

#### Espessura de Borda

```
Thin:  1px
Medium: 2px
Thick:  3px
```

---

### 3.6 Transições e Animações

#### Durações

```
Fast:   150ms
Normal: 200ms
Slow:   300ms
Slower: 500ms
```

#### Easing Functions

```
Ease-out: cubic-bezier(0.0, 0, 0.2, 1)
Ease-in:  cubic-bezier(0.4, 0, 1, 1)
Ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

**Uso:**
- Hover states: 150ms ease-out
- Modal transitions: 300ms ease-out
- Loading animations: 1s linear infinite

---

## 4. Componentes

### 4.1 Botões

#### Botão Primário

```
Estado Normal:
- Background: #3B82F6
- Color: #FFFFFF
- Padding: 12px 24px
- Border-radius: 8px
- Font-size: 16px
- Font-weight: 500
- Border: none
- Cursor: pointer

Estado Hover:
- Background: #2563EB
- Transform: scale(1.02)
- Box-shadow: Shadow MD

Estado Active:
- Background: #1D4ED8
- Transform: scale(0.98)

Estado Disabled:
- Background: #E5E7EB
- Color: #9CA3AF
- Cursor: not-allowed
```

#### Botão Secundário

```
Estado Normal:
- Background: transparent
- Color: #3B82F6
- Border: 1px solid #3B82F6
- Padding: 12px 24px
- Resto igual ao primário
```

#### Botão Texto

```
Estado Normal:
- Background: transparent
- Color: #3B82F6
- Padding: 8px 16px
- Sem borda
```

#### Tamanhos

```
Small:
- Padding: 8px 16px
- Font-size: 14px

Medium (padrão):
- Padding: 12px 24px
- Font-size: 16px

Large:
- Padding: 16px 32px
- Font-size: 18px
```

---

### 4.2 Inputs

#### Input de Texto

```
Estado Normal:
- Background: #FFFFFF
- Border: 1px solid #D1D5DB
- Border-radius: 4px
- Padding: 12px 16px
- Font-size: 16px
- Color: #111827
- Width: 100%

Estado Focus:
- Border-color: #3B82F6
- Box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)
- Outline: none

Estado Error:
- Border-color: #EF4444
- Box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)

Estado Disabled:
- Background: #F3F4F6
- Color: #9CA3AF
- Cursor: not-allowed
```

#### Textarea

```
- Mesmas propriedades do Input
- Min-height: 100px
- Resize: vertical
```

---

### 4.3 Cards

#### Card de Tarefa

```
Estado Normal:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border-radius: 8px
- Padding: 16px
- Box-shadow: Shadow (padrão)
- Cursor: pointer

Estado Hover:
- Box-shadow: Shadow MD
- Transform: translateY(-2px)

Estado Dragging:
- Opacity: 0.7
- Transform: scale(1.05)
- Box-shadow: Shadow LG
- Z-index: 1000
```

#### Card de Projeto

```
- Similar ao card de tarefa
- Padding: 24px
- Min-height: 200px
- Display: flex
- Flex-direction: column
```

---

### 4.4 Modais

#### Modal Overlay

```
- Background: rgba(0, 0, 0, 0.5)
- Backdrop-filter: blur(4px)
- Position: fixed
- Top: 0, Left: 0, Right: 0, Bottom: 0
- Z-index: 100
```

#### Modal Content

```
- Background: #FFFFFF
- Border-radius: 12px
- Padding: 24px
- Max-width: 600px
- Max-height: 90vh
- Margin: auto
- Position: relative
- Z-index: 101
- Box-shadow: Shadow XL
```

---

### 4.5 Badges e Tags

#### Badge

```
- Background: #EFF6FF
- Color: #1E40AF
- Padding: 4px 12px
- Border-radius: 9999px
- Font-size: 12px
- Font-weight: 500
```

#### Variantes

```
Sucesso: Background #D1FAE5, Color #065F46
Aviso: Background #FEF3C7, Color #92400E
Erro: Background #FEE2E2, Color #991B1B
```

---

### 4.6 Toast Notifications

#### Toast Container

```
- Position: fixed
- Top: 24px (desktop) / Bottom: 24px (mobile)
- Right: 24px
- Z-index: 1000
- Display: flex
- Flex-direction: column
- Gap: 12px
```

#### Toast Item

```
- Background: #FFFFFF
- Border-radius: 8px
- Padding: 16px
- Box-shadow: Shadow LG
- Min-width: 300px
- Max-width: 400px
- Display: flex
- Align-items: center
- Gap: 12px
```

---

## 5. Layout

### 5.1 Grid System

#### Container

```
Max-width: 1280px
Padding: 0 24px (desktop), 0 16px (mobile)
Margin: 0 auto
```

#### Grid para Board

```
Display: flex
Gap: 24px
Overflow-x: auto
Padding-bottom: 24px
```

---

### 5.2 Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
Large:   > 1440px
```

---

## 6. Ícones

### 6.1 Biblioteca

**Recomendação:** Lucide React / Heroicons

**Tamanhos Padrão:**
- Small: 16px
- Medium: 20px
- Large: 24px
- XL: 32px

### 6.2 Ícones Principais

- ➕ Adicionar/Criar
- ✏️ Editar
- 🗑️ Excluir
- ✓ Concluído/Check
- ⚙️ Configurações
- 🔍 Buscar
- ← → Navegação

---

## 7. Estados Visuais

### 7.1 Loading

**Spinner:**
- Tamanho: 20px (small), 40px (large)
- Cor: Cor primária
- Animação: rotate 1s linear infinite

**Skeleton:**
- Background: linear-gradient
- Animação: shimmer 1.5s linear infinite

### 7.2 Empty States

**Ícone/Ilustração:**
- Tamanho: 80px
- Opacity: 0.5
- Margin-bottom: 16px

**Texto:**
- Color: #6B7280
- Font-size: 16px
- Text-align: center

---

## 8. Acessibilidade

### 8.1 Contraste

**Mínimo WCAG AA:**
- Texto normal: 4.5:1
- Texto grande: 3:1
- Componentes UI: 3:1

### 8.2 Foco

**Focus Ring:**
- Outline: 2px solid #3B82F6
- Outline-offset: 2px
- Border-radius: 4px

### 8.3 Touch Targets

**Mínimo:**
- 44x44px (mobile)
- Espaçamento entre: 8px mínimo

---

## 9. Responsividade

### 9.1 Mobile First

**Abordagem:** Design mobile primeiro, depois adaptar para desktop

**Adaptações:**
- Colunas empilhadas verticalmente
- Navegação hamburger
- Botões full-width quando necessário
- Touch targets maiores

---

## 10. Documentação de Componentes

Cada componente deve ter documentação incluindo:
- Descrição e propósito
- Props/Propriedades
- Exemplos de uso
- Estados (normal, hover, active, disabled, etc.)
- Variantes
- Acessibilidade
- Código de exemplo

---

**Fim do Documento**

