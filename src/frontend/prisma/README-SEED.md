# Script de Seed - Banco de Dados

Este script popula o banco de dados com dados de teste para facilitar o desenvolvimento e testes.

## 📋 O que é criado

### 👤 Usuários (3)
- **Maria Silva** - `maria@exemplo.com` | Senha: `123456`
- **João Santos** - `joao@exemplo.com` | Senha: `123456`
- **Ana Costa** - `ana@exemplo.com` | Senha: `123456`

### 📁 Projetos (3)

1. **Projeto Alpha** (Maria)
   - Sistema de gestão de projetos
   - 4 etapas: Backlog, To Do, Doing, Done
   - 7 tarefas com sub-tarefas e etiquetas

2. **Projeto Beta** (Maria)
   - Dashboard de métricas
   - 5 etapas: Backlog, Planejamento, Desenvolvimento, Testes, Concluído
   - 3 tarefas

3. **Projeto Pessoal** (João)
   - Tarefas pessoais e estudos
   - 3 etapas: Pendente, Em Andamento, Finalizado
   - 3 tarefas

### 🏷️ Etiquetas (10)

**Projeto Alpha:**
- Urgente (vermelho)
- Alta Prioridade (laranja)
- Média Prioridade (amarelo)
- Baixa Prioridade (verde)
- Frontend (azul)
- Backend (índigo)

**Projeto Beta:**
- Design (roxo)
- Teste (rosa)
- Bug (vermelho)
- Feature (cyan)

### ✅ Tarefas (13)

**Projeto Alpha:**
- Configurar ambiente de desenvolvimento (To Do)
- Implementar sistema de autenticação (Doing)
- Criar componentes do Kanban (Doing)
- Configurar banco de dados (Done)
- Implementar API de projetos (To Do)
- Adicionar testes unitários (Backlog)
- Criar documentação (Backlog)

**Projeto Beta:**
- Projetar layout do dashboard (Backlog)
- Implementar gráficos (Desenvolvimento)
- Configurar API de métricas (Planejamento)

**Projeto Pessoal:**
- Estudar React Hooks (Em Andamento)
- Revisar TypeScript (Pendente)
- Fazer exercícios físicos (Finalizado)

### 📝 Sub-tarefas (~25)

Cada tarefa tem sub-tarefas relacionadas, algumas já marcadas como concluídas (principalmente nas tarefas em Done/Finalizado).

### 🔗 Vinculações

- Tarefas vinculadas a etiquetas apropriadas
- Tarefas organizadas por etapas
- Sub-tarefas vinculadas às tarefas

## 🚀 Como usar

### Executar seed
```bash
npm run db:seed
```

### Limpar e executar novamente
O script automaticamente limpa todos os dados existentes antes de criar novos. Se você quiser manter os dados existentes, comente as linhas 11-17 do arquivo `seed.ts`.

### Executar apenas uma vez
Execute o seed uma vez após configurar o banco pela primeira vez. Executar múltiplas vezes irá limpar e recriar todos os dados.

## 📊 Estatísticas Esperadas

Após executar o seed, você terá aproximadamente:

- **3** usuários
- **3** projetos
- **12** etapas (4 + 5 + 3)
- **13** tarefas
- **~25** sub-tarefas
- **10** etiquetas
- **~15** vinculações de etiquetas

## 🔧 Personalização

Você pode editar o arquivo `prisma/seed.ts` para:
- Adicionar mais usuários
- Criar mais projetos
- Adicionar tarefas personalizadas
- Modificar dados de teste

## ⚠️ Avisos

1. **Dados serão deletados**: O seed limpa todos os dados existentes antes de criar novos
2. **Apenas para desenvolvimento**: Não execute em produção
3. **Senhas**: Todos os usuários usam a senha `123456` (apenas para testes)

## 🎯 Casos de Uso

- Testar funcionalidades com dados realistas
- Desenvolvimento de novas features
- Demonstrações e apresentações
- Testes de UI/UX
- Validação de performance com dados





