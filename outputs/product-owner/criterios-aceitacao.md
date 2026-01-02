# Critérios de Aceitação - Sistema Kanban

## US-001: Criar Projeto

### Cenários de Sucesso
- ✅ Usuário acessa a interface de criação de projeto
- ✅ Usuário preenche nome do projeto (obrigatório)
- ✅ Usuário pode opcionalmente adicionar descrição
- ✅ Ao clicar em "Criar", projeto é salvo no banco de dados (Neon)
- ✅ Usuário é redirecionado para o projeto criado
- ✅ Projeto aparece na lista de projetos

### Casos Extremos
- ⚠️ Nome do projeto vazio: sistema deve mostrar mensagem de erro
- ⚠️ Nome muito longo (>255 caracteres): sistema deve truncar ou avisar limite
- ⚠️ Nome duplicado: sistema deve permitir (pode ter múltiplos projetos com mesmo nome)
- ⚠️ Erro ao salvar no banco: sistema deve mostrar mensagem de erro amigável

### Validações Necessárias
- Nome do projeto é obrigatório
- Nome do projeto não pode ser apenas espaços em branco
- Usuário deve ter permissão para criar projetos (considerar autenticação futura)

---

## US-002: Criar Etapa no Projeto

### Cenários de Sucesso
- ✅ Usuário seleciona um projeto existente
- ✅ Usuário acessa opção "Adicionar Etapa"
- ✅ Usuário preenche nome da etapa (obrigatório)
- ✅ Usuário pode opcionalmente escolher cor/ícone
- ✅ Etapa é criada e aparece visualmente no board
- ✅ Etapa é salva no banco de dados vinculada ao projeto

### Casos Extremos
- ⚠️ Projeto não existe: sistema deve retornar erro 404
- ⚠️ Nome vazio: sistema deve mostrar validação
- ⚠️ Número máximo de etapas: considerar limite técnico ou de UX (ex: 10 etapas)
- ⚠️ Nome duplicado na mesma etapa: sistema deve permitir (pode ter etapas com mesmo nome)

### Validações Necessárias
- Projeto deve existir
- Nome da etapa é obrigatório
- Etapa deve estar vinculada a um projeto válido

---

## US-003: Criar Tarefa na Etapa

### Cenários de Sucesso
- ✅ Usuário seleciona uma etapa dentro de um projeto
- ✅ Usuário clica em "Adicionar Tarefa" ou similar
- ✅ Modal/formulário abre para criar tarefa
- ✅ Usuário preenche título da tarefa (obrigatório)
- ✅ Usuário pode opcionalmente adicionar descrição, data de vencimento, etc.
- ✅ Tarefa é salva no banco vinculada à etapa e projeto
- ✅ Tarefa aparece imediatamente na etapa selecionada
- ✅ Tarefa é posicionada no final da lista por padrão

### Casos Extremos
- ⚠️ Etapa não existe: sistema deve retornar erro
- ⚠️ Título vazio: sistema deve validar e bloquear criação
- ⚠️ Descrição muito longa: considerar limite ou truncar na visualização
- ⚠️ Múltiplas tarefas criadas simultaneamente: sistema deve manter ordem consistente

### Validações Necessárias
- Etapa deve existir
- Título da tarefa é obrigatório
- Tarefa deve estar vinculada a etapa e projeto válidos

---

## US-004: Visualizar Tarefas por Etapa

### Cenários de Sucesso
- ✅ Usuário visualiza board Kanban com todas as etapas
- ✅ Cada etapa mostra suas tarefas como cards
- ✅ Tarefas são exibidas na ordem correta (conforme ordem salva)
- ✅ Cards mostram informações essenciais: título, descrição resumida, status de subtarefas
- ✅ Interface é responsiva (funciona em desktop e mobile)
- ✅ Loading state é mostrado enquanto carrega dados
- ✅ Empty state é mostrado quando etapa está vazia

### Casos Extremos
- ⚠️ Muitas tarefas em uma etapa (>50): sistema deve paginar ou virtualizar
- ⚠️ Nenhuma etapa criada: mostrar mensagem para criar primeira etapa
- ⚠️ Erro ao carregar: mostrar mensagem de erro com opção de retry
- ⚠️ Tarefas sem título: sistema deve mostrar placeholder

### Validações Necessárias
- Dados devem ser carregados do banco via API Routes
- Ordem das tarefas deve ser respeitada
- Performance aceitável (<2s para carregar)

---

## US-005: Mover Tarefa entre Posições (Drag and Drop)

### Cenários de Sucesso
- ✅ Usuário arrasta uma tarefa dentro da mesma etapa
- ✅ Feedback visual mostra onde a tarefa será solta (indicador de posição)
- ✅ Ao soltar, tarefa se move para nova posição
- ✅ Ordem é atualizada imediatamente na interface (otimistic update)
- ✅ Nova ordem é persistida no banco de dados via API
- ✅ Outros usuários veem a nova ordem após refresh/sincronização

### Casos Extremos
- ⚠️ Drag cancelado (ESC ou soltar fora): tarefa retorna para posição original
- ⚠️ Múltiplos drags simultâneos: sistema deve prevenir ou processar em sequência
- ⚠️ Tarefa movida para posição inexistente: tarefa vai para última posição
- ⚠️ Erro ao salvar nova ordem: tarefa deve retornar para posição original e mostrar erro
- ⚠️ Conflito de edição: se outro usuário moveu a mesma tarefa, tratar conflito

### Validações Necessárias
- Drag and drop deve funcionar em desktop (mouse) e mobile (touch)
- Ordem deve ser persistida corretamente no banco
- Performance aceitável durante drag (60fps ou próximo)

---

## US-006: Mover Tarefa entre Etapas (Drag and Drop)

### Cenários de Sucesso
- ✅ Usuário arrasta tarefa de uma etapa origem
- ✅ Feedback visual mostra que tarefa pode ser solta na etapa destino
- ✅ Ao soltar em outra etapa, tarefa move para nova etapa
- ✅ Tarefa aparece imediatamente na nova etapa (otimistic update)
- ✅ Vinculação no banco é atualizada (tarefa.apartir_id)
- ✅ Tarefa desaparece da etapa origem

### Casos Extremos
- ⚠️ Soltar em área inválida: tarefa retorna para etapa original
- ⚠️ Etapa destino foi excluída durante drag: tratar erro graciosamente
- ⚠️ Usuário sem permissão na etapa destino: mostrar erro de permissão (futuro)
- ⚠️ Erro de rede durante movimento: tarefa retorna para origem, mostrar erro

### Validações Necessárias
- Etapa destino deve existir e ser válida
- Tarefa deve estar vinculada corretamente à nova etapa no banco
- Todas as subtarefas devem acompanhar a tarefa (manter vínculo)

---

## US-007: Criar Subtarefas

### Cenários de Sucesso
- ✅ Usuário abre detalhes de uma tarefa
- ✅ Usuário visualiza seção de subtarefas
- ✅ Usuário clica em "Adicionar Subtarefa"
- ✅ Campo de input aparece para digitar nome da subtarefa
- ✅ Ao confirmar (Enter ou botão), subtarefa é adicionada à lista
- ✅ Subtarefa é salva no banco vinculada à tarefa
- ✅ Subtarefa aparece na lista com checkbox não marcado

### Casos Extremos
- ⚠️ Nome vazio: sistema deve validar antes de criar
- ⚠️ Muitas subtarefas: considerar limite ou scroll infinito
- ⚠️ Tarefa foi excluída durante criação: tratar erro
- ⚠️ Criar múltiplas subtarefas rapidamente: todas devem ser salvas

### Validações Necessárias
- Tarefa deve existir
- Nome da subtarefa é obrigatório
- Subtarefa deve estar vinculada à tarefa no banco

---

## US-008: Editar Subtarefa

### Cenários de Sucesso
- ✅ Usuário clica em uma subtarefa existente
- ✅ Campo de input fica editável (inline editing)
- ✅ Usuário modifica o texto
- ✅ Ao confirmar (Enter ou perder foco), alteração é salva
- ✅ Alteração é persistida no banco via API
- ✅ Feedback visual confirma que foi salvo

### Casos Extremos
- ⚠️ Texto vazio após edição: sistema deve validar ou manter texto original
- ⚠️ Cancelar edição (ESC): mudanças são descartadas
- ⚠️ Subtarefa foi excluída durante edição: mostrar erro
- ⚠️ Múltiplas edições simultâneas: considerar lock ou última escrita vence

### Validações Necessárias
- Subtarefa deve existir
- Texto não pode ser vazio após edição

---

## US-009: Excluir Subtarefa

### Cenários de Sucesso
- ✅ Usuário acessa opção de excluir subtarefa (ícone lixeira ou menu)
- ✅ Sistema solicita confirmação (modal ou confirm dialog)
- ✅ Ao confirmar, subtarefa é removida da interface
- ✅ Subtarefa é deletada do banco de dados
- ✅ Lista de subtarefas é atualizada

### Casos Extremos
- ⚠️ Cancelar exclusão: subtarefa permanece
- ⚠️ Subtarefa já foi excluída: tratar erro graciosamente
- ⚠️ Erro ao excluir no banco: subtarefa deve reaparecer, mostrar erro

### Validações Necessárias
- Subtarefa deve existir antes de excluir
- Operação deve ser confirmada pelo usuário (prevenir exclusão acidental)

---

## US-010: Marcar Subtarefa como Concluída

### Cenários de Sucesso
- ✅ Usuário clica no checkbox da subtarefa
- ✅ Checkbox fica marcado visualmente
- ✅ Texto da subtarefa fica riscado (strikethrough) ou com estilo diferenciado
- ✅ Status é atualizado no banco (subtarefa.concluida = true)
- ✅ Contador de progresso da tarefa é atualizado (X de Y concluídas)

### Casos Extremos
- ⚠️ Subtarefa já estava marcada: não deve fazer nada ou desmarcar (se implementado toggle)
- ⚠️ Subtarefa foi excluída durante marcação: tratar erro
- ⚠️ Erro ao salvar: checkbox deve desmarcar e mostrar erro

### Validações Necessárias
- Subtarefa deve existir
- Estado deve ser persistido corretamente no banco

---

## US-011: Desmarcar Subtarefa Concluída

### Cenários de Sucesso
- ✅ Usuário clica no checkbox de subtarefa já marcada
- ✅ Checkbox fica desmarcado
- ✅ Texto perde estilo de concluída (sem strikethrough)
- ✅ Status é atualizado no banco (subtarefa.concluida = false)
- ✅ Contador de progresso é atualizado

### Casos Extremos
- ⚠️ Subtarefa já estava desmarcada: não deve fazer nada
- ⚠️ Erro ao salvar: checkbox deve voltar a marcar e mostrar erro

### Validações Necessárias
- Subtarefa deve existir
- Operação deve ser reversível (pode desmarcar após marcar)

---

## US-012: Interface Moderna e Intuitiva

### Cenários de Sucesso
- ✅ Design segue princípios de UI/UX modernos (espaçamento adequado, tipografia clara)
- ✅ Cores e contrastes seguem padrões de acessibilidade (WCAG AA mínimo)
- ✅ Animações e transições são suaves e proporcionam feedback
- ✅ Interface é responsiva e funciona bem em diferentes tamanhos de tela
- ✅ Loading states, empty states e error states são bem implementados
- ✅ Navegação é intuitiva e não requer treinamento extenso

### Casos Extremos
- ⚠️ Usuário com deficiência visual: sistema deve ser navegável via leitor de tela
- ⚠️ Conexão lenta: interface deve mostrar feedback de carregamento
- ⚠️ Tela muito pequena: interface deve se adaptar (mobile-first)

### Validações Necessárias
- Testes de usabilidade com usuários reais
- Compatibilidade com navegadores modernos (Chrome, Firefox, Safari, Edge)
- Performance de renderização (<100ms para interações)

---

## US-013: Editar Tarefa

### Cenários de Sucesso
- ✅ Usuário clica em uma tarefa para abrir detalhes
- ✅ Modal ou painel lateral abre com formulário editável
- ✅ Usuário pode editar título, descrição e outros campos
- ✅ Ao salvar, alterações são persistidas no banco
- ✅ Interface é atualizada imediatamente
- ✅ Mudanças são visíveis em todas as views onde tarefa aparece

### Casos Extremos
- ⚠️ Título vazio: sistema deve validar antes de salvar
- ⚠️ Tarefa foi excluída durante edição: mostrar erro e fechar modal
- ⚠️ Cancelar edição: mudanças são descartadas sem salvar

### Validações Necessárias
- Tarefa deve existir
- Título não pode ser vazio
- Todas as validações de criação devem se aplicar

---

## US-014: Excluir Tarefa

### Cenários de Sucesso
- ✅ Usuário acessa opção de excluir tarefa (menu ou botão)
- ✅ Sistema solicita confirmação com mensagem clara
- ✅ Ao confirmar, tarefa é removida da etapa
- ✅ Tarefa e todas suas subtarefas são deletadas do banco (cascade)
- ✅ Interface é atualizada removendo a tarefa

### Casos Extremos
- ⚠️ Cancelar exclusão: tarefa permanece
- ⚠️ Tarefa tem muitas subtarefas: todas devem ser deletadas corretamente
- ⚠️ Erro ao excluir: tarefa deve reaparecer, mostrar erro

### Validações Necessárias
- Confirmação obrigatória (prevenir exclusão acidental)
- Cascade delete de subtarefas deve funcionar

---

## US-015: Editar Projeto

### Cenários de Sucesso
- ✅ Usuário acessa configurações do projeto
- ✅ Formulário de edição é exibido com dados atuais
- ✅ Usuário pode modificar nome e descrição
- ✅ Alterações são salvas no banco
- ✅ Nome atualizado aparece em toda interface

### Casos Extremos
- ⚠️ Nome vazio: validar e bloquear
- ⚠️ Projeto não existe: retornar erro 404

### Validações Necessárias
- Nome não pode ser vazio
- Projeto deve existir

---

## US-016: Excluir Projeto

### Cenários de Sucesso
- ✅ Usuário acessa opção de excluir projeto
- ✅ Sistema solicita confirmação (importante: avisar que vai excluir tudo)
- ✅ Ao confirmar, projeto e todas etapas/tarefas/subtarefas são deletadas
- ✅ Usuário é redirecionado para lista de projetos ou dashboard

### Casos Extremos
- ⚠️ Projeto tem muitos dados: exclusão pode demorar, mostrar progresso
- ⚠️ Cancelar: projeto permanece intacto
- ⚠️ Erro durante exclusão: tratar graciosamente, pode deixar dados inconsistentes

### Validações Necessárias
- Confirmação dupla (é operação destrutiva)
- Cascade delete de todas dependências

---

## US-017: Editar Etapa

### Cenários de Sucesso
- ✅ Usuário clica em configurações da etapa
- ✅ Modal/formulário abre para edição
- ✅ Usuário pode modificar nome e possivelmente cor
- ✅ Alterações são salvas
- ✅ Nome atualizado aparece no board

### Casos Extremos
- ⚠️ Nome vazio: validar
- ⚠️ Etapa não existe: erro 404

### Validações Necessárias
- Nome não pode ser vazio
- Etapa deve existir

---

## US-018: Excluir Etapa

### Cenários de Sucesso
- ✅ Usuário acessa opção de excluir etapa
- ✅ Sistema avisa que tarefas serão afetadas
- ✅ Sistema pergunta o que fazer com tarefas (mover para outra etapa ou excluir)
- ✅ Ao confirmar, etapa é deletada
- ✅ Tarefas são tratadas conforme escolha do usuário

### Casos Extremos
- ⚠️ Etapa tem muitas tarefas: processo pode demorar, mostrar progresso
- ⚠️ Etapa destino não existe mais: validar antes de mover
- ⚠️ Cancelar: etapa permanece

### Validações Necessárias
- Definir destino para tarefas antes de excluir
- Etapa destino deve existir (se aplicável)

---

## Critérios de Aceitação Gerais (Aplicáveis a Todas as US)

### Performance
- ✅ Tempo de resposta da API < 500ms para operações simples
- ✅ Tempo de resposta da API < 2s para operações complexas
- ✅ Interface responsiva a interações < 100ms

### Usabilidade
- ✅ Mensagens de erro são claras e acionáveis
- ✅ Feedback visual para todas as ações do usuário
- ✅ Confirmações para operações destrutivas

### Segurança
- ✅ Validação de dados no frontend e backend
- ✅ Sanitização de inputs para prevenir XSS
- ✅ Tratamento de erros não expõe informações sensíveis

### Acessibilidade
- ✅ Navegação por teclado funcional
- ✅ Contraste adequado (WCAG AA)
- ✅ Labels descritivos para screen readers

