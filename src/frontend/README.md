# Sistema Kanban - Frontend

Sistema de gerenciamento de projetos baseado no método Kanban, desenvolvido com Next.js 14, React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **@dnd-kit** - Biblioteca de drag and drop
- **Neon SDK** - Cliente para banco de dados PostgreSQL

## 📋 Pré-requisitos

- Node.js 18+ (LTS recomendado)
- npm, yarn ou pnpm
- Conta Neon (para banco de dados)

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd src/frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:
```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Configure o banco de dados:
   - Crie um banco no Neon
   - Execute o schema SQL:
   ```bash
   # Conecte ao banco e execute:
   psql $DATABASE_URL < migrations/schema.sql
   ```
   
   - (Opcional) Popule com dados de teste:
   ```bash
   psql $DATABASE_URL < migrations/seed.sql
   ```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse: http://localhost:3000

## 📁 Estrutura do Projeto

```
src/frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Páginas do dashboard
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Design System)
│   ├── kanban/           # Componentes Kanban
│   ├── projects/         # Componentes de Projetos
│   ├── tasks/            # Componentes de Tarefas
│   └── shared/           # Componentes compartilhados
├── lib/                  # Utilitários e configurações
│   ├── api/             # Cliente API
│   ├── db/              # Configuração Neon SDK
│   ├── types/           # TypeScript types
│   └── utils/           # Funções utilitárias
└── migrations/          # Scripts SQL
    ├── schema.sql       # Schema do banco
    └── seed.sql         # Dados de teste
```

## 🎯 Funcionalidades

### Implementadas
- ✅ Criar e gerenciar projetos
- ✅ Criar e gerenciar etapas (colunas)
- ✅ Criar e gerenciar tarefas
- ✅ Drag and drop de tarefas (reordenar e mover entre etapas)
- ✅ Gerenciar subtarefas (criar, editar, excluir, marcar como concluída)
- ✅ Interface responsiva
- ✅ Design moderno e intuitivo

### Próximas Funcionalidades
- ⏳ Editar projetos e etapas
- ⏳ Excluir projetos e etapas
- ⏳ Busca e filtros
- ⏳ Atribuição de tarefas
- ⏳ Datas de vencimento
- ⏳ Notificações

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linter
npm run type-check   # Verifica tipos TypeScript
```

## 📝 API Routes

### Projetos
- `GET /api/projects` - Lista projetos
- `POST /api/projects` - Cria projeto
- `GET /api/projects/[id]` - Obter projeto
- `PUT /api/projects/[id]` - Atualizar projeto
- `DELETE /api/projects/[id]` - Excluir projeto
- `GET /api/projects/[id]/stages` - Lista etapas do projeto

### Etapas
- `POST /api/stages` - Cria etapa
- `PUT /api/stages/[id]` - Atualiza etapa
- `DELETE /api/stages/[id]` - Exclui etapa

### Tarefas
- `GET /api/tasks` - Lista tarefas (filtro: projeto_id ou etapa_id)
- `POST /api/tasks` - Cria tarefa
- `GET /api/tasks/[id]` - Obter tarefa
- `PUT /api/tasks/[id]` - Atualizar tarefa
- `DELETE /api/tasks/[id]` - Excluir tarefa
- `PATCH /api/tasks/[id]/move` - Mover tarefa

### Subtarefas
- `GET /api/subtasks` - Lista subtarefas (filtro: tarefa_id)
- `POST /api/subtasks` - Cria subtarefa
- `PUT /api/subtasks/[id]` - Atualiza subtarefa
- `DELETE /api/subtasks/[id]` - Exclui subtarefa
- `PATCH /api/subtasks/[id]/toggle` - Alterna status concluída

## 🎨 Design System

O projeto segue um Design System baseado nos princípios definidos em `outputs/ux/design-system.md`:

- **Cores**: Paleta primária azul, neutros e cores semânticas
- **Tipografia**: Inter como fonte principal
- **Espaçamento**: Sistema baseado em 4px
- **Componentes**: Botões, inputs, modais, cards, etc.

## 📚 Documentação

Consulte a documentação completa nos diretórios:
- `outputs/product-owner/` - Requisitos e user stories
- `outputs/architect/` - Arquitetura e decisões técnicas
- `outputs/ux/` - Design e pesquisa de usuário

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

