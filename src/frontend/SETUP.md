# Guia de Setup Rápido

## Passo a Passo para Executar o Sistema

### 1. Instalar Dependências
```bash
cd src/frontend
npm install
```

### 2. Configurar Banco de Dados

#### Opção A: Usar Neon (Recomendado)
1. Acesse https://neon.tech
2. Crie uma conta e um novo projeto
3. Copie a connection string
4. Cole no arquivo `.env` como `DATABASE_URL`

#### Opção B: PostgreSQL Local
1. Instale PostgreSQL localmente
2. Crie um banco de dados
3. Configure a `DATABASE_URL` no `.env`

### 3. Configurar Variáveis de Ambiente
```bash
cp .env.example .env
```

Edite o `.env`:
```env
DATABASE_URL="sua-connection-string-aqui"
JWT_SECRET="seu-jwt-secret-aqui"
JWT_EXPIRES_IN="7d"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Gerar JWT_SECRET seguro:**
```bash
# Opção 1: Usar o script do projeto
npm run generate:jwt-secret

# Opção 2: Gerar diretamente no terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**JWT_SECRET pré-gerado (já está no .env.example):**
```
ded982acd9f67daddcb9c7f8e652a53fa2633044a7ebc170a871915b58589753
```

Você pode usar este valor ou gerar um novo. **IMPORTANTE:** Use um secret diferente para produção!

### 4. Configurar Prisma
```bash
# Gerar Prisma Client
npm run db:generate

# Aplicar schema ao banco (cria todas as tabelas)
npm run db:push
```

### 5. Popular Banco com Dados de Teste (Opcional)
```bash
# Executar seed para criar dados de teste
npm run db:seed

# Isso criará:
# - 3 usuários de teste
# - 3 projetos com etapas
# - Múltiplas tarefas com sub-tarefas
# - Etiquetas e vinculações
```

**Credenciais de teste criadas:**
- Email: `maria@exemplo.com` | Senha: `123456`
- Email: `joao@exemplo.com` | Senha: `123456`
- Email: `ana@exemplo.com` | Senha: `123456`

### 6. Iniciar Aplicação
```bash
npm run dev
```

Acesse: http://localhost:3000

### 6. Criar Primeira Conta
1. Vá para http://localhost:3000/register
2. Crie sua conta
3. Você será redirecionado para a página de projetos
4. Crie seu primeiro projeto!

## ✅ Checklist de Verificação

- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` configurado
- [ ] `DATABASE_URL` válida
- [ ] `JWT_SECRET` configurado
- [ ] Prisma Client gerado (`npm run db:generate`)
- [ ] Schema aplicado ao banco (`npm run db:push`)
- [ ] Servidor rodando (`npm run dev`)

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
**Solução:** Execute `npm install` novamente

### Erro: "Prisma Client not generated"
**Solução:** Execute `npm run db:generate`

### Erro: "Database connection failed"
**Solução:** 
- Verifique se a `DATABASE_URL` está correta
- Teste a conexão no Prisma Studio: `npm run db:studio`

### Erro: "JWT_SECRET not found"
**Solução:** Adicione `JWT_SECRET` no arquivo `.env`

## 📚 Comandos Úteis

```bash
# Ver dados no banco
npm run db:studio

# Popular banco com dados de teste
npm run db:seed

# Criar nova migration
npm run db:migrate

# Verificar tipos TypeScript
npm run type-check

# Verificar código
npm run lint
```

## Deploy no Vercel (Produção)

Para o app funcionar em produção **é obrigatório** configurar o **Root Directory**:

1. No [Vercel Dashboard](https://vercel.com), abra o projeto.
2. **Settings** → **General** → **Root Directory**.
3. Clique em **Edit**, marque **Include source files outside of the Root Directory** se precisar.
4. Defina o diretório raiz como: **`src/frontend`** (sem barra no final).
5. Salve e faça um novo deploy (**Redeploy**).

Se o Root Directory não for `src/frontend`, o Vercel faz o build na raiz do repositório (onde não está o Next.js) e você verá **404 NOT_FOUND** ao acessar o site.

**Variáveis de ambiente no Vercel:** em **Settings** → **Environment Variables**, configure:
- `DATABASE_URL` (connection string do Neon/PostgreSQL)
- `JWT_SECRET`
- Opcional: `JWT_EXPIRES_IN`, `NEXT_PUBLIC_APP_URL` (URL do app em produção)

## 🎉 Pronto!

Agora você pode usar todas as funcionalidades do sistema:
- ✅ Criar projetos
- ✅ Criar etapas e tarefas
- ✅ Usar drag and drop no Kanban
- ✅ Alternar entre Kanban e Lista
- ✅ Gerenciar sub-tarefas
- ✅ Usar etiquetas
- ✅ E muito mais!

