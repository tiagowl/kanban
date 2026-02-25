# Sistema Kanban - Frontend

Sistema completo de gerenciamento de projetos tipo Kanban desenvolvido com Next.js 14, React, TypeScript, Prisma e Shadcn UI.

## 🚀 Funcionalidades

### Sprint 0-3 (MVP)
- ✅ Autenticação (Login/Registro)
- ✅ Gerenciamento de Projetos (CRUD)
- ✅ Gerenciamento de Etapas (CRUD)
- ✅ Gerenciamento de Tarefas (CRUD)
- ✅ Visualização Kanban com Drag & Drop
- ✅ Visualização Lista de Tarefas
- ✅ Alternância entre Kanban e Lista

### Sprint 4-6 (V1.0)
- ✅ Sistema de Sub-tarefas (CRUD completo)
- ✅ Sistema de Etiquetas (CRUD completo)
- ✅ Vincular Etiquetas a Tarefas
- ✅ Marcar/Desmarcar Sub-tarefas como concluídas
- ✅ Edição e Exclusão de Projetos e Etapas

## 📋 Pré-requisitos

- Node.js 18+ (LTS recomendado)
- npm ou yarn
- PostgreSQL (Neon recomendado)
- Conta no Neon ou banco PostgreSQL local

## 🛠️ Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
JWT_SECRET="seu-secret-key-aqui"
JWT_EXPIRES_IN="7d"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. **Configurar Prisma:**
```bash
# Gerar Prisma Client
npm run db:generate

# Criar banco de dados e aplicar migrations
npm run db:push

# Ou criar migrations
npm run db:migrate
```

4. **Iniciar servidor de desenvolvimento:**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Backend)
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── projects/          # Páginas de projetos
│   └── layout.tsx         # Layout raiz
├── components/
│   ├── ui/                # Componentes Shadcn UI
│   ├── kanban/            # Componentes do Kanban
│   ├── tasks/             # Componentes de tarefas
│   └── projects/          # Componentes de projetos
├── hooks/                  # Hooks customizados
├── lib/                    # Utilitários e helpers
├── services/               # Services de negócio
├── types/                  # Tipos TypeScript
└── prisma/
    └── schema.prisma       # Schema do Prisma
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint
- `npm run type-check` - Verifica tipos TypeScript
- `npm run db:generate` - Gera Prisma Client
- `npm run db:push` - Aplica schema ao banco
- `npm run db:migrate` - Cria migration
- `npm run db:studio` - Abre Prisma Studio

## 🎨 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados (via Neon)
- **Shadcn UI** - Componentes UI acessíveis
- **Tailwind CSS** - Estilização
- **@dnd-kit** - Drag and Drop
- **Zod** - Validação de schemas
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Ícones

## 📚 Documentação

Toda a documentação do projeto está em:
- `outputs/product-owner/` - Documentação do Product Owner
- `outputs/ux/` - Documentação de UX
- `outputs/architect/` - Documentação de Arquitetura

## 🔐 Autenticação

O sistema usa JWT para autenticação. O token é armazenado no `localStorage` e enviado em todas as requisições via header `Authorization: Bearer <token>`.

## 🎯 Próximos Passos

1. Configurar banco de dados no Neon
2. Executar migrations do Prisma
3. Criar primeiro usuário via registro
4. Começar a usar o sistema!

## 📝 Notas

- O sistema cria automaticamente 4 etapas padrão ao criar um projeto: Backlog, To Do, Doing, Done
- O drag and drop funciona tanto no Kanban quanto para reordenar tarefas
- As preferências de visualização (Kanban/Lista) são salvas no localStorage
- Todas as operações têm feedback visual via Toast notifications

## 🐛 Troubleshooting

**Erro de conexão com banco:**
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o banco está acessível

**Erro de autenticação:**
- Verifique se `JWT_SECRET` está configurado
- Limpe o localStorage e faça login novamente

**Erro de build:**
- Execute `npm run db:generate` antes de fazer build
- Verifique se todas as dependências estão instaladas






