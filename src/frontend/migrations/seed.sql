-- Script para popular o banco de dados com dados de teste
-- Este script pode ser executado múltiplas vezes sem erros (usa ON CONFLICT DO NOTHING)

-- Inserir projetos de teste
INSERT INTO projetos (id, nome, descricao) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Projeto Web', 'Desenvolvimento de aplicação web moderna'),
  ('b1ffcd00-ad1c-5ef9-cc7e-7cc0ce491b22', 'Projeto Mobile', 'App mobile para iOS e Android'),
  ('c2ffde11-be2d-6ef0-dd8f-8dd1df502c33', 'Projeto API', 'API RESTful para integração')
ON CONFLICT (id) DO NOTHING;

-- Inserir etapas para o primeiro projeto
INSERT INTO etapas (id, projeto_id, nome, ordem) VALUES
  ('e1ffef22-cf3e-7ef1-ee9f-9ee2ef613d44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Backlog', 0),
  ('f2ffef33-de4f-8ef2-ff0f-0ff3ef724e55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Todo', 1),
  ('a3ffef44-ef5f-9ef3-ff1f-1ff4ef835f66', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Doing', 2),
  ('b4ffef55-fe6f-0ef4-ff2f-2ff5ef946f77', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Done', 3)
ON CONFLICT (id) DO NOTHING;

-- Inserir etapas para o segundo projeto
INSERT INTO etapas (id, projeto_id, nome, ordem) VALUES
  ('c5ffef66-af7f-1ef5-ff3f-3ff6ef057f88', 'b1ffcd00-ad1c-5ef9-cc7e-7cc0ce491b22', 'Backlog', 0),
  ('d6ffef77-bf8f-2ef6-ff4f-4ff7ef168f99', 'b1ffcd00-ad1c-5ef9-cc7e-7cc0ce491b22', 'Em Progresso', 1),
  ('e7ffef88-cf9f-3ef7-ff5f-5ff8ef279f00', 'b1ffcd00-ad1c-5ef9-cc7e-7cc0ce491b22', 'Concluído', 2)
ON CONFLICT (id) DO NOTHING;

-- Inserir tarefas para o primeiro projeto
INSERT INTO tarefas (id, etapa_id, projeto_id, titulo, descricao, ordem) VALUES
  ('f1ffef99-df0f-4ef8-ff6f-6ff9ef380f11', 'e1ffef22-cf3e-7ef1-ee9f-9ee2ef613d44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Configurar ambiente de desenvolvimento', 'Instalar Node.js, Next.js e dependências', 0),
  ('a2ffef00-ef1f-5ef9-ff7f-7ff0ef491f22', 'f2ffef33-de4f-8ef2-ff0f-0ff3ef724e55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Criar componente de board Kanban', 'Implementar drag and drop', 0),
  ('b3ffef11-ff2f-6ef0-ff8f-8ff1ef502f33', 'f2ffef33-de4f-8ef2-ff0f-0ff3ef724e55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Implementar API de tarefas', 'Criar endpoints CRUD', 1),
  ('c4ffef22-0f3f-7ef1-ff9f-9ff2ef613f44', 'a3ffef44-ef5f-9ef3-ff1f-1ff4ef835f66', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Design do sistema', 'Criar wireframes e protótipos', 0),
  ('d5ffef33-1f4f-8ef2-ff0f-0ff3ef724f55', 'b4ffef55-fe6f-0ef4-ff2f-2ff5ef946f77', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Setup inicial do projeto', 'Configurar repositório Git', 0)
ON CONFLICT (id) DO NOTHING;

-- Inserir subtarefas para algumas tarefas
INSERT INTO subtarefas (id, tarefa_id, nome, concluida, ordem) VALUES
  ('e1ffef44-2f5f-9ef3-ff1f-1ff4ef835f66', 'a2ffef00-ef1f-5ef9-ff7f-7ff0ef491f22', 'Instalar @dnd-kit', true, 0),
  ('f2ffef55-3f6f-0ef4-ff2f-2ff5ef946f77', 'a2ffef00-ef1f-5ef9-ff7f-7ff0ef491f22', 'Criar componente Column', false, 1),
  ('a3ffef66-4f7f-1ef5-ff3f-3ff6ef057f88', 'a2ffef00-ef1f-5ef9-ff7f-7ff0ef491f22', 'Criar componente TaskCard', false, 2),
  ('b4ffef77-5f8f-2ef6-ff4f-4ff7ef168f99', 'b3ffef11-ff2f-6ef0-ff8f-8ff1ef502f33', 'Endpoint GET /tasks', true, 0),
  ('c5ffef88-6f9f-3ef7-ff5f-5ff8ef279f00', 'b3ffef11-ff2f-6ef0-ff8f-8ff1ef502f33', 'Endpoint POST /tasks', true, 1),
  ('d6ffef99-7f0f-4ef8-ff6f-6ff9ef380f11', 'b3ffef11-ff2f-6ef0-ff8f-8ff1ef502f33', 'Endpoint PATCH /tasks/[id]/move', false, 2)
ON CONFLICT (id) DO NOTHING;

