# Documentação de Requisitos - Sistema Kanban

## 1. Análise de Requisitos

### Objetivos de Negócio
- Criar um sistema de gerenciamento de projetos do tipo Kanban para organizar tarefas em etapas
- Permitir que usuários organizem e visualizem suas tarefas de forma visual e intuitiva
- Facilitar o acompanhamento do progresso de projetos através de diferentes estágios
- Prover flexibilidade na visualização (Kanban ou Lista)

### Usuários-Alvo
1. **Gestor de Projetos**: Cria e gerencia múltiplos projetos, define etapas e acompanha o progresso
2. **Membro de Equipe**: Cria tarefas, move entre etapas, gerencia sub-tarefas e marca conclusões
3. **Usuário Individual**: Organiza tarefas pessoais em projetos e etapas

### Funcionalidades Principais

#### 1. Autenticação e Autorização
- Sistema de login
- Autenticação de usuários
- Sessões de usuário

#### 2. Gerenciamento de Projetos
- Criar projeto
- Editar projeto
- Excluir projeto
- Listar projetos do usuário

#### 3. Gerenciamento de Etapas
- Criar etapa dentro de um projeto
- Editar etapa
- Excluir etapa
- Cada etapa pertence a um projeto
- Ordem hierárquica: Projeto → Etapa → Tarefa

#### 4. Gerenciamento de Tarefas
- Criar tarefa em uma etapa
- Editar tarefa
- Excluir tarefa
- Visualizar tarefas por etapa
- Drag and Drop:
  - Reordenar tarefas dentro da mesma etapa
  - Mover tarefas entre etapas diferentes

#### 5. Gerenciamento de Sub-tarefas
- Criar lista de sub-tarefas em uma tarefa
- Editar sub-tarefa
- Excluir sub-tarefa
- Marcar/desmarcar sub-tarefa como concluída

#### 6. Sistema de Etiquetas (Labels)
- Criar etiqueta (nome + cor)
- Editar etiqueta
- Excluir etiqueta
- Vincular etiqueta a uma tarefa
- Visualizar etiquetas nas tarefas

#### 7. Visualização
- Visão Kanban (colunas por etapa)
- Visão Lista (lista de tarefas)
- Alternar entre as duas visões

### Restrições e Limitações Técnicas

#### Stack Tecnológica
- **Frontend**: Next.js (React)
- **Backend**: Next.js API Routes
- **ORM**: Prisma
- **Banco de Dados**: Neon (PostgreSQL)
- **UI Components**: Shadcn UI (via MCP configurado)
- **Ícones**: Lucide Icons

#### Dependências Técnicas
- Prisma ORM para modelagem e acesso ao banco
- Shadcn UI MCP configurado no Cursor
- Sistema de autenticação (a definir implementação específica)
- Biblioteca de drag and drop (a escolher: dnd-kit, react-beautiful-dnd, etc.)

#### Limitações de Negócio
- Cada tarefa pertence a apenas uma etapa por vez
- Cada etapa pertence a apenas um projeto
- Cada projeto pertence a um usuário
- Etapas devem ser criadas antes das tarefas
- Projetos devem ser criados antes das etapas

### Riscos Identificados
1. **Performance**: Drag and drop com muitas tarefas pode ter performance reduzida
2. **Concorrência**: Múltiplos usuários editando a mesma tarefa simultaneamente
3. **Autenticação**: Necessidade de definir estratégia de autenticação segura
4. **Migração de Dados**: Modelagem do Prisma precisa considerar evolução futura
5. **UX**: Alternar entre visões pode confundir usuários se não houver persistência de preferência

## 2. Modelo de Dados Conceitual

```
Usuário
├── Projetos
    ├── Etapas
    │   ├── Tarefas
    │   │   ├── Sub-tarefas
    │   │   └── Etiquetas (Many-to-Many)
    └── Etiquetas (globais do projeto)
```

## 3. Fluxos Principais

### Fluxo 1: Criação de Projeto Completo
1. Usuário faz login
2. Usuário cria um novo projeto
3. Usuário cria etapas no projeto (ex: Backlog, To Do, Doing, Done)
4. Usuário cria tarefas nas etapas
5. Usuário visualiza no Kanban

### Fluxo 2: Gerenciamento de Tarefa
1. Usuário visualiza tarefas em visão Kanban
2. Usuário arrasta tarefa para outra etapa (Doing → Done)
3. Usuário clica na tarefa para editar
4. Usuário adiciona sub-tarefas
5. Usuário vincula etiquetas
6. Usuário marca sub-tarefas como concluídas

### Fluxo 3: Organização com Etiquetas
1. Usuário cria etiquetas com cores
2. Usuário vincula etiquetas a tarefas
3. Usuário filtra/visualiza tarefas por etiqueta (futuro)

### Fluxo 4: Alternância de Visualização
1. Usuário está em visão Kanban
2. Usuário clica para alternar para visão Lista
3. Sistema mantém contexto (projeto, filtros)
4. Usuário pode alternar de volta

## 4. Requisitos Não-Funcionais

### Performance
- Tempo de carregamento inicial < 2s
- Drag and drop responsivo (< 100ms delay)
- Suportar pelo menos 100 tarefas por etapa sem degradação

### Usabilidade
- Interface intuitiva seguindo padrões Shadcn UI
- Feedback visual imediato em todas as ações
- Mensagens de erro claras e acionáveis

### Segurança
- Autenticação segura
- Autorização: usuário só acessa seus próprios projetos
- Validação de dados no frontend e backend
- Proteção contra SQL Injection (via Prisma)

### Compatibilidade
- Funcionar em navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsivo para desktop e tablet (mobile futuro)

### Escalabilidade
- Modelo de dados suporta crescimento
- Estrutura preparada para features futuras (compartilhamento, equipes, etc.)


