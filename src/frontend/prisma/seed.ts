import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes (opcional - comentar se quiser manter dados)
  console.log('🧹 Limpando dados existentes...')
  await prisma.taskLabel.deleteMany()
  await prisma.subtask.deleteMany()
  await prisma.task.deleteMany()
  await prisma.label.deleteMany()
  await prisma.stage.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // Criar usuários de teste
  console.log('👤 Criando usuários...')
  const hashedPassword = await bcrypt.hash('123456', 10)

  const user1 = await prisma.user.create({
    data: {
      email: 'maria@exemplo.com',
      password: hashedPassword,
      name: 'Maria Silva',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'joao@exemplo.com',
      password: hashedPassword,
      name: 'João Santos',
    },
  })

  const user3 = await prisma.user.create({
    data: {
      email: 'ana@exemplo.com',
      password: hashedPassword,
      name: 'Ana Costa',
    },
  })

  console.log(`✅ Criados ${3} usuários`)

  // Criar projetos para o usuário 1
  console.log('📁 Criando projetos...')
  const project1 = await prisma.project.create({
    data: {
      name: 'Projeto Alpha',
      description: 'Sistema de gestão de projetos',
      userId: user1.id,
      stages: {
        create: [
          { name: 'Backlog', order: 0 },
          { name: 'To Do', order: 1 },
          { name: 'Doing', order: 2 },
          { name: 'Done', order: 3 },
        ],
      },
    },
    include: {
      stages: true,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Projeto Beta',
      description: 'Dashboard de métricas',
      userId: user1.id,
      stages: {
        create: [
          { name: 'Backlog', order: 0 },
          { name: 'Planejamento', order: 1 },
          { name: 'Desenvolvimento', order: 2 },
          { name: 'Testes', order: 3 },
          { name: 'Concluído', order: 4 },
        ],
      },
    },
    include: {
      stages: true,
    },
  })

  const project3 = await prisma.project.create({
    data: {
      name: 'Projeto Pessoal',
      description: 'Tarefas pessoais e estudos',
      userId: user2.id,
      stages: {
        create: [
          { name: 'Pendente', order: 0 },
          { name: 'Em Andamento', order: 1 },
          { name: 'Finalizado', order: 2 },
        ],
      },
    },
    include: {
      stages: true,
    },
  })

  console.log(`✅ Criados ${3} projetos`)

  // Criar etiquetas
  console.log('🏷️ Criando etiquetas...')
  const labels = [
    { name: 'Urgente', color: '#ef4444' },
    { name: 'Alta Prioridade', color: '#f97316' },
    { name: 'Média Prioridade', color: '#eab308' },
    { name: 'Baixa Prioridade', color: '#10b981' },
    { name: 'Frontend', color: '#3b82f6' },
    { name: 'Backend', color: '#6366f1' },
    { name: 'Design', color: '#a855f7' },
    { name: 'Teste', color: '#ec4899' },
    { name: 'Bug', color: '#f43f5e' },
    { name: 'Feature', color: '#06b6d4' },
  ]

  const createdLabels = []
  for (const label of labels.slice(0, 6)) {
    const created = await prisma.label.create({
      data: {
        ...label,
        projectId: project1.id,
      },
    })
    createdLabels.push(created)
  }

  for (const label of labels.slice(6)) {
    const created = await prisma.label.create({
      data: {
        ...label,
        projectId: project2.id,
      },
    })
    createdLabels.push(created)
  }

  console.log(`✅ Criadas ${createdLabels.length} etiquetas`)

  // Criar tarefas para o Projeto 1
  console.log('✅ Criando tarefas...')
  const tasksData = [
    {
      title: 'Configurar ambiente de desenvolvimento',
      description: 'Instalar todas as dependências e configurar o ambiente local',
      stage: project1.stages[1], // To Do
      labels: [createdLabels[4], createdLabels[5]], // Frontend, Backend
      subtasks: [
        'Instalar Node.js e npm',
        'Configurar banco de dados',
        'Configurar variáveis de ambiente',
        'Testar conexão com banco',
      ],
    },
    {
      title: 'Implementar sistema de autenticação',
      description: 'Criar login, registro e gerenciamento de sessão',
      stage: project1.stages[2], // Doing
      labels: [createdLabels[5], createdLabels[0]], // Backend, Urgente
      subtasks: [
        'Criar endpoint de login',
        'Criar endpoint de registro',
        'Implementar JWT',
        'Criar middleware de autenticação',
        'Testar fluxo completo',
      ],
    },
    {
      title: 'Criar componentes do Kanban',
      description: 'Desenvolver componentes para visualização Kanban',
      stage: project1.stages[2], // Doing
      labels: [createdLabels[4]], // Frontend
      subtasks: [
        'Componente KanbanBoard',
        'Componente KanbanColumn',
        'Componente TaskCard',
        'Implementar drag and drop',
      ],
    },
    {
      title: 'Configurar banco de dados',
      description: 'Configurar Prisma e criar schema inicial',
      stage: project1.stages[3], // Done
      labels: [createdLabels[5]], // Backend
      subtasks: [
        'Criar schema Prisma',
        'Executar migrations',
        'Validar estrutura',
      ],
    },
    {
      title: 'Implementar API de projetos',
      description: 'Criar endpoints CRUD para projetos',
      stage: project1.stages[1], // To Do
      labels: [createdLabels[5], createdLabels[1]], // Backend, Alta Prioridade
      subtasks: [
        'GET /api/projects',
        'POST /api/projects',
        'PATCH /api/projects/:id',
        'DELETE /api/projects/:id',
      ],
    },
    {
      title: 'Adicionar testes unitários',
      description: 'Escrever testes para componentes principais',
      stage: project1.stages[0], // Backlog
      labels: [createdLabels[1]], // Alta Prioridade
      subtasks: [
        'Configurar Vitest',
        'Testar componentes UI',
        'Testar hooks',
        'Testar services',
      ],
    },
    {
      title: 'Criar documentação',
      description: 'Documentar API e componentes',
      stage: project1.stages[0], // Backlog
      labels: [createdLabels[2]], // Média Prioridade
      subtasks: [
        'Documentar endpoints',
        'Documentar componentes',
        'Criar exemplos de uso',
      ],
    },
  ]

  const createdTasks = []
  for (const taskData of tasksData) {
    const task = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        stageId: taskData.stage.id,
        order: createdTasks.filter((t) => t.stageId === taskData.stage.id).length,
      },
    })
    createdTasks.push(task)

    // Criar sub-tarefas
    if (taskData.subtasks && taskData.subtasks.length > 0) {
      for (let i = 0; i < taskData.subtasks.length; i++) {
        await prisma.subtask.create({
          data: {
            title: taskData.subtasks[i],
            taskId: task.id,
            completed: taskData.stage.order >= 3 && i < 2, // Marcar algumas como concluídas se estiver em Done
            order: i,
          },
        })
      }
    }

    // Vincular etiquetas
    for (const label of taskData.labels) {
      await prisma.taskLabel.create({
        data: {
          taskId: task.id,
          labelId: label.id,
        },
      })
    }
  }

  // Criar tarefas para o Projeto 2
  const project2Tasks = [
    {
      title: 'Projetar layout do dashboard',
      description: 'Criar wireframes e mockups',
      stage: project2.stages[0], // Backlog
      labels: [createdLabels[6]], // Design
    },
    {
      title: 'Implementar gráficos',
      description: 'Integrar biblioteca de gráficos',
      stage: project2.stages[2], // Desenvolvimento
      labels: [createdLabels[4]], // Frontend
      subtasks: [
        'Escolher biblioteca',
        'Implementar gráfico de vendas',
        'Implementar gráfico de usuários',
      ],
    },
    {
      title: 'Configurar API de métricas',
      description: 'Criar endpoints para coletar métricas',
      stage: project2.stages[1], // Planejamento
      labels: [createdLabels[5]], // Backend
    },
  ]

  for (const taskData of project2Tasks) {
    const task = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        stageId: taskData.stage.id,
        order: createdTasks.filter((t) => t.stageId === taskData.stage.id).length,
      },
    })
    createdTasks.push(task)

    if (taskData.subtasks) {
      for (let i = 0; i < taskData.subtasks.length; i++) {
        await prisma.subtask.create({
          data: {
            title: taskData.subtasks[i],
            taskId: task.id,
            completed: false,
            order: i,
          },
        })
      }
    }

    if (taskData.labels && taskData.labels.length > 0) {
      for (const label of taskData.labels) {
        await prisma.taskLabel.create({
          data: {
            taskId: task.id,
            labelId: label.id,
          },
        })
      }
    }
  }

  // Criar tarefas para o Projeto 3
  const project3Tasks = [
    {
      title: 'Estudar React Hooks',
      description: 'Aprofundar conhecimento sobre hooks avançados',
      stage: project3.stages[1], // Em Andamento
      subtasks: [
        'useReducer',
        'useMemo',
        'useCallback',
        'Custom hooks',
      ],
    },
    {
      title: 'Revisar TypeScript',
      description: 'Estudar tipos avançados e generics',
      stage: project3.stages[0], // Pendente
    },
    {
      title: 'Fazer exercícios físicos',
      description: 'Manter rotina de exercícios',
      stage: project3.stages[2], // Finalizado
      subtasks: [
        'Corrida matinal',
        'Musculação',
        'Alongamento',
      ],
    },
  ]

  for (const taskData of project3Tasks) {
    const stage = project3.stages.find((s) => s.name === taskData.stage.name) || project3.stages[0]
    const task = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        stageId: stage.id,
        order: createdTasks.filter((t) => t.stageId === stage.id).length,
      },
    })
    createdTasks.push(task)

    if (taskData.subtasks) {
      for (let i = 0; i < taskData.subtasks.length; i++) {
        await prisma.subtask.create({
          data: {
            title: taskData.subtasks[i],
            taskId: task.id,
            completed: stage.order >= 2,
            order: i,
          },
        })
      }
    }
  }

  console.log(`✅ Criadas ${createdTasks.length} tarefas`)

  // Resumo
  const usersCount = await prisma.user.count()
  const projectsCount = await prisma.project.count()
  const stagesCount = await prisma.stage.count()
  const tasksCount = await prisma.task.count()
  const subtasksCount = await prisma.subtask.count()
  const labelsCount = await prisma.label.count()
  const taskLabelsCount = await prisma.taskLabel.count()

  console.log('\n📊 Resumo do Seed:')
  console.log('='.repeat(50))
  console.log(`👤 Usuários:        ${usersCount}`)
  console.log(`📁 Projetos:        ${projectsCount}`)
  console.log(`📋 Etapas:          ${stagesCount}`)
  console.log(`✅ Tarefas:         ${tasksCount}`)
  console.log(`📝 Sub-tarefas:     ${subtasksCount}`)
  console.log(`🏷️  Etiquetas:       ${labelsCount}`)
  console.log(`🔗 Vinculações:     ${taskLabelsCount}`)
  console.log('='.repeat(50))
  console.log('\n✨ Seed concluído com sucesso!')
  console.log('\n🔑 Credenciais de teste:')
  console.log('   Email: maria@exemplo.com | Senha: 123456')
  console.log('   Email: joao@exemplo.com  | Senha: 123456')
  console.log('   Email: ana@exemplo.com   | Senha: 123456')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
