# Critérios de Aceitação - Sistema Kanban

## US-001: Login de Usuário

### Cenários de Sucesso
- ✅ Usuário informa credenciais válidas (email/senha)
- ✅ Sistema valida credenciais e autentica o usuário
- ✅ Sistema redireciona para a página de projetos após login bem-sucedido
- ✅ Sistema mantém sessão ativa

### Casos Extremos
- ❌ Usuário informa email não cadastrado → Exibir mensagem "Email ou senha inválidos"
- ❌ Usuário informa senha incorreta → Exibir mensagem "Email ou senha inválidos"
- ❌ Campos vazios → Botão de login desabilitado ou exibir validação
- ❌ Email em formato inválido → Exibir mensagem de formato incorreto

### Validações Necessárias
- Validar formato de email no frontend
- Validar presença de ambos os campos
- Sanitizar inputs antes de enviar ao backend
- Implementar proteção contra tentativas de força bruta (futuro)

---

## US-003: Criar Projeto

### Cenários de Sucesso
- ✅ Usuário preenche nome do projeto e clica em "Criar"
- ✅ Sistema valida dados e cria projeto no banco
- ✅ Projeto é associado ao usuário logado
- ✅ Sistema redireciona ou atualiza lista mostrando o novo projeto
- ✅ Projeto aparece na lista de projetos do usuário

### Casos Extremos
- ❌ Nome vazio → Botão desabilitado ou exibir validação "Nome é obrigatório"
- ❌ Nome muito longo (> 100 caracteres) → Exibir mensagem de limite
- ❌ Usuário sem permissão → Não permitir criação
- ❌ Erro de conexão com banco → Exibir mensagem de erro e permitir retry

### Validações Necessárias
- Nome é obrigatório (não vazio, sem apenas espaços)
- Nome tem limite de caracteres (100 caracteres)
- Verificar autenticação do usuário
- Validar no backend (não apenas frontend)

---

## US-007: Criar Etapa em Projeto

### Cenários de Sucesso
- ✅ Usuário seleciona um projeto
- ✅ Usuário preenche nome da etapa e clica em "Criar Etapa"
- ✅ Sistema valida e cria etapa associada ao projeto
- ✅ Etapa aparece na visualização do projeto
- ✅ Etapa pode receber tarefas

### Casos Extremos
- ❌ Nome vazio → Validação "Nome da etapa é obrigatório"
- ❌ Projeto não existe → Erro 404
- ❌ Projeto pertence a outro usuário → Erro de autorização
- ❌ Nome duplicado na mesma etapa → Permitir (ou avisar se necessário)

### Validações Necessárias
- Nome obrigatório
- Projeto deve existir e pertencer ao usuário
- Verificar autorização no backend
- Validar limite de caracteres (50 caracteres)

---

## US-010: Criar Tarefa em Etapa

### Cenários de Sucesso
- ✅ Usuário seleciona uma etapa
- ✅ Usuário preenche título da tarefa (e opcionalmente descrição)
- ✅ Sistema cria tarefa associada à etapa
- ✅ Tarefa aparece na visualização (Kanban ou Lista)
- ✅ Tarefa pode ser editada, movida ou excluída

### Casos Extremos
- ❌ Título vazio → Validação "Título é obrigatório"
- ❌ Etapa não existe → Erro 404
- ❌ Etapa pertence a outro projeto/usuário → Erro de autorização
- ❌ Descrição muito longa → Validar limite (1000 caracteres)

### Validações Necessárias
- Título obrigatório (não vazio, sem apenas espaços)
- Título com limite (200 caracteres)
- Descrição opcional com limite (1000 caracteres)
- Etapa deve existir e pertencer a projeto do usuário
- Verificar autorização em cascata (Usuário → Projeto → Etapa → Tarefa)

---

## US-014: Reordenar Tarefas na Mesma Etapa (Drag and Drop)

### Cenários de Sucesso
- ✅ Usuário arrasta tarefa e solta em nova posição na mesma coluna
- ✅ Sistema atualiza ordem das tarefas
- ✅ Ordem é persistida no banco de dados
- ✅ Interface atualiza visualmente sem recarregar página
- ✅ Outras tarefas se reposicionam corretamente

### Casos Extremos
- ❌ Drag em tarefa inexistente → Não permitir ação
- ❌ Soltar fora da área válida → Retornar tarefa à posição original
- ❌ Múltiplos usuários reordenando simultaneamente → Última alteração prevalece (ou lock)
- ❌ Erro na persistência → Reverter visualmente e exibir erro
- ❌ Tarefa muito pesada (muitos dados) → Feedback de carregamento durante drag

### Validações Necessárias
- Tarefa deve existir e pertencer à etapa
- Verificar autorização
- Validar nova posição (índice válido)
- Atualizar campo `order` ou `position` no banco
- Feedback visual durante drag (cursor, preview)

---

## US-015: Mover Tarefa Entre Etapas (Drag and Drop)

### Cenários de Sucesso
- ✅ Usuário arrasta tarefa de uma coluna para outra
- ✅ Sistema atualiza etapa da tarefa no banco
- ✅ Tarefa aparece na nova etapa na visualização
- ✅ Tarefa desaparece da etapa original
- ✅ Ordem na nova etapa é preservada ou definida

### Casos Extremos
- ❌ Drag para etapa inexistente → Retornar à posição original
- ❌ Drag para etapa de outro projeto → Não permitir (ou perguntar)
- ❌ Etapa de destino excluída durante drag → Retornar à original e avisar
- ❌ Erro na atualização → Reverter visualmente e exibir erro
- ❌ Tarefa com sub-tarefas → Mover também (ou avisar se necessário)

### Validações Necessárias
- Verificar existência de ambas as etapas
- Verificar que ambas etapas pertencem ao mesmo projeto
- Verificar autorização
- Atualizar campo `stageId` no banco
- Manter integridade referencial
- Feedback visual durante drag entre colunas

---

## US-016: Criar Sub-tarefa

### Cenários de Sucesso
- ✅ Usuário seleciona uma tarefa
- ✅ Usuário clica em "Adicionar Sub-tarefa" ou campo de input
- ✅ Usuário preenche nome da sub-tarefa
- ✅ Sistema cria sub-tarefa associada à tarefa
- ✅ Sub-tarefa aparece na lista de sub-tarefas da tarefa
- ✅ Sub-tarefa começa como não concluída

### Casos Extremos
- ❌ Nome vazio → Validação "Nome é obrigatório"
- ❌ Tarefa não existe → Erro 404
- ❌ Muitas sub-tarefas (100+) → Permitir mas avisar sobre performance
- ❌ Nome muito longo → Validar limite (200 caracteres)

### Validações Necessárias
- Nome obrigatório
- Limite de caracteres (200)
- Tarefa deve existir e pertencer ao usuário
- Verificar autorização
- Campo `completed` inicializado como `false`

---

## US-019: Marcar Sub-tarefa como Concluída

### Cenários de Sucesso
- ✅ Usuário clica no checkbox da sub-tarefa
- ✅ Sistema atualiza status para concluída
- ✅ Visual muda (texto riscado, checkbox marcado)
- ✅ Status é persistido no banco
- ✅ Atualização é instantânea (sem recarregar)

### Casos Extremos
- ❌ Sub-tarefa não existe → Não permitir ação
- ❌ Sub-tarefa já está concluída → Não fazer nada ou permitir toggle
- ❌ Erro na atualização → Reverter visualmente e exibir erro

### Validações Necessárias
- Sub-tarefa deve existir
- Verificar autorização
- Atualizar campo `completed` para `true`
- Feedback visual imediato

---

## US-021: Criar Etiqueta

### Cenários de Sucesso
- ✅ Usuário preenche nome da etiqueta
- ✅ Usuário seleciona uma cor (paleta ou input hex)
- ✅ Sistema cria etiqueta associada ao projeto ou usuário
- ✅ Etiqueta fica disponível para vincular a tarefas
- ✅ Etiqueta aparece na lista de etiquetas disponíveis

### Casos Extremos
- ❌ Nome vazio → Validação "Nome é obrigatório"
- ❌ Cor inválida → Validar formato (hex válido)
- ❌ Nome duplicado → Permitir ou avisar
- ❌ Limite de etiquetas por projeto → Validar se houver limite

### Validações Necessárias
- Nome obrigatório (50 caracteres)
- Cor é obrigatória e válida (formato hex ou paleta predefinida)
- Verificar autorização
- Armazenar cor no formato consistente (hex)

---

## US-024: Vincular Etiqueta a Tarefa

### Cenários de Sucesso
- ✅ Usuário seleciona uma tarefa
- ✅ Usuário clica para adicionar etiqueta
- ✅ Sistema exibe lista de etiquetas disponíveis
- ✅ Usuário seleciona uma ou mais etiquetas
- ✅ Etiquetas aparecem visualmente na tarefa (badge com cor)
- ✅ Vínculo é persistido no banco

### Casos Extremos
- ❌ Tarefa não existe → Erro 404
- ❌ Etiqueta não existe → Não exibir na lista
- ❌ Tentar vincular etiqueta já vinculada → Não duplicar, apenas confirmar
- ❌ Tarefa com muitas etiquetas → Mostrar com scroll ou truncar

### Validações Necessárias
- Tarefa e etiqueta devem existir
- Verificar que ambos pertencem ao mesmo contexto (projeto)
- Relação many-to-many bem configurada no Prisma
- Verificar autorização
- Feedback visual imediato

---

## US-026: Visualizar Tarefas em Kanban

### Cenários de Sucesso
- ✅ Sistema exibe colunas, uma para cada etapa do projeto
- ✅ Cada coluna mostra título da etapa e lista de tarefas
- ✅ Tarefas são exibidas como cards arrastáveis
- ✅ Cards mostram informações básicas (título, etiquetas)
- ✅ Interface é responsiva e organizada
- ✅ Drag and drop funciona entre colunas

### Casos Extremos
- ❌ Projeto sem etapas → Exibir mensagem "Crie etapas para começar"
- ❌ Etapa sem tarefas → Exibir coluna vazia com mensagem
- ❌ Muitas tarefas em uma etapa (100+) → Implementar paginação ou virtualização
- ❌ Etapas muito largas → Implementar scroll horizontal ou limitar largura

### Validações Necessárias
- Carregar etapas do projeto
- Carregar tarefas de cada etapa
- Ordenar tarefas por posição/ordem
- Verificar autorização do projeto
- Layout responsivo (Shadcn UI)
- Performance com muitas tarefas

---

## US-027: Visualizar Tarefas em Lista

### Cenários de Sucesso
- ✅ Sistema exibe lista de tarefas
- ✅ Cada tarefa mostra: título, etapa, etiquetas, status
- ✅ Lista é ordenável (por etapa, data, etc.)
- ✅ Interface permite scroll
- ✅ Tarefas são clicáveis para editar

### Casos Extremos
- ❌ Nenhuma tarefa → Exibir mensagem "Nenhuma tarefa criada"
- ❌ Muitas tarefas (500+) → Implementar paginação
- ❌ Filtros aplicados sem resultado → Exibir "Nenhuma tarefa encontrada"

### Validações Necessárias
- Carregar todas as tarefas do projeto
- Agrupar ou ordenar de forma lógica
- Verificar autorização
- Performance com muitas tarefas (pagination/virtualization)

---

## US-028: Alternar Entre Visão Kanban e Lista

### Cenários de Sucesso
- ✅ Usuário clica no botão/toggle para alternar visualização
- ✅ Sistema muda de Kanban para Lista ou vice-versa
- ✅ Dados permanecem os mesmos (mesmo projeto, mesmas tarefas)
- ✅ Alternância é instantânea (sem recarregar página)
- ✅ Preferência pode ser salva (localStorage ou perfil)

### Casos Extremos
- ❌ Alternar durante drag → Cancelar drag e alternar visualização
- ❌ Erro ao carregar dados → Exibir erro e manter visualização atual

### Validações Necessárias
- Estado de visualização gerenciado (useState ou contexto)
- Preservar contexto (projeto selecionado, filtros)
- Salvar preferência do usuário (opcional)
- Feedback visual durante transição (loading se necessário)

---

## Critérios Gerais de Aceitação para Todas as User Stories

### Validações Comuns
- ✅ Todas as ações requerem autenticação
- ✅ Usuário só acessa seus próprios recursos
- ✅ Validação no frontend (UX) e backend (segurança)
- ✅ Mensagens de erro claras e acionáveis
- ✅ Feedback visual em todas as ações (loading, sucesso, erro)

### Performance
- ✅ Tempo de resposta < 500ms para ações simples
- ✅ Tempo de resposta < 2s para carregamentos iniciais
- ✅ Interface não congela durante operações

### Acessibilidade
- ✅ Navegação por teclado (tab, enter, esc)
- ✅ Labels descritivos para screen readers
- ✅ Contraste adequado (Shadcn UI padrão)

### Consistência
- ✅ Usar componentes Shadcn UI consistentemente
- ✅ Ícones Lucide Icons
- ✅ Padrão de cores do design system
- ✅ Mensagens em português (ou idioma definido)





