# User Stories - Sistema Kanban

## US-001: Criar Projeto
**Como** gerente de projeto  
**Eu quero** criar um novo projeto  
**Para que** eu possa organizar minhas tarefas por contexto ou cliente  

**Prioridade:** Alta  
**Estimativa:** 3 pontos  
**Dependências:** Nenhuma  

---

## US-002: Criar Etapa no Projeto
**Como** membro da equipe  
**Eu quero** criar etapas (ex: Backlog, Todo, Doing, Done) em um projeto  
**Para que** eu possa organizar o fluxo de trabalho do projeto  

**Prioridade:** Alta  
**Estimativa:** 3 pontos  
**Dependências:** US-001 (projeto deve existir)  

---

## US-003: Criar Tarefa na Etapa
**Como** membro da equipe  
**Eu quero** criar tarefas dentro de uma etapa específica  
**Para que** eu possa registrar o trabalho que precisa ser realizado  

**Prioridade:** Alta  
**Estimativa:** 5 pontos  
**Dependências:** US-001, US-002 (projeto e etapa devem existir)  

---

## US-004: Visualizar Tarefas por Etapa
**Como** membro da equipe  
**Eu quero** visualizar todas as tarefas organizadas por etapa  
**Para que** eu possa ter uma visão clara do status de cada item de trabalho  

**Prioridade:** Alta  
**Estimativa:** 5 pontos  
**Dependências:** US-003 (tarefas devem existir)  

---

## US-005: Mover Tarefa entre Posições (Drag and Drop)
**Como** membro da equipe  
**Eu quero** arrastar e soltar tarefas para reordenar dentro da mesma etapa  
**Para que** eu possa priorizar tarefas visualmente  

**Prioridade:** Alta  
**Estimativa:** 8 pontos  
**Dependências:** US-003 (tarefas devem existir)  

---

## US-006: Mover Tarefa entre Etapas (Drag and Drop)
**Como** membro da equipe  
**Eu quero** arrastar e soltar tarefas de uma etapa para outra  
**Para que** eu possa atualizar o status do trabalho sem precisar editar manualmente  

**Prioridade:** Alta  
**Estimativa:** 8 pontos  
**Dependências:** US-003, US-005 (tarefas devem existir e sistema de drag and drop implementado)  

---

## US-007: Criar Subtarefas
**Como** membro da equipe  
**Eu quero** criar uma lista de subtarefas dentro de uma tarefa  
**Para que** eu possa quebrar trabalhos complexos em etapas menores e rastreáveis  

**Prioridade:** Média  
**Estimativa:** 5 pontos  
**Dependências:** US-003 (tarefas devem existir)  

---

## US-008: Editar Subtarefa
**Como** membro da equipe  
**Eu quero** editar o conteúdo de uma subtarefa  
**Para que** eu possa atualizar informações conforme o trabalho evolui  

**Prioridade:** Média  
**Estimativa:** 3 pontos  
**Dependências:** US-007 (subtarefas devem existir)  

---

## US-009: Excluir Subtarefa
**Como** membro da equipe  
**Eu quero** excluir uma subtarefa  
**Para que** eu possa remover itens que não são mais necessários  

**Prioridade:** Média  
**Estimativa:** 2 pontos  
**Dependências:** US-007 (subtarefas devem existir)  

---

## US-010: Marcar Subtarefa como Concluída
**Como** membro da equipe  
**Eu quero** marcar uma subtarefa como concluída  
**Para que** eu possa rastrear o progresso dentro de uma tarefa maior  

**Prioridade:** Média  
**Estimativa:** 3 pontos  
**Dependências:** US-007 (subtarefas devem existir)  

---

## US-011: Desmarcar Subtarefa Concluída
**Como** membro da equipe  
**Eu quero** desmarcar uma subtarefa que foi marcada como concluída por engano  
**Para que** eu possa corrigir erros ou quando o trabalho precisa ser refeito  

**Prioridade:** Média  
**Estimativa:** 2 pontos  
**Dependências:** US-010 (sistema de marcação deve existir)  

---

## US-012: Interface Moderna e Intuitiva
**Como** usuário do sistema  
**Eu quero** uma interface visual elegante e intuitiva  
**Para que** eu possa usar o sistema de forma eficiente e agradável  

**Prioridade:** Alta  
**Estimativa:** 13 pontos  
**Dependências:** Todas as outras US (deve ser aplicada em todas as funcionalidades)  

---

## US-013: Editar Tarefa
**Como** membro da equipe  
**Eu quero** editar informações de uma tarefa existente  
**Para que** eu possa atualizar detalhes conforme necessário  

**Prioridade:** Média  
**Estimativa:** 5 pontos  
**Dependências:** US-003 (tarefas devem existir)  

---

## US-014: Excluir Tarefa
**Como** membro da equipe  
**Eu quero** excluir uma tarefa  
**Para que** eu possa remover itens que não são mais relevantes  

**Prioridade:** Média  
**Estimativa:** 3 pontos  
**Dependências:** US-003 (tarefas devem existir)  

---

## US-015: Editar Projeto
**Como** gerente de projeto  
**Eu quero** editar informações de um projeto  
**Para que** eu possa atualizar detalhes do projeto conforme necessário  

**Prioridade:** Baixa  
**Estimativa:** 3 pontos  
**Dependências:** US-001 (projeto deve existir)  

---

## US-016: Excluir Projeto
**Como** gerente de projeto  
**Eu quero** excluir um projeto  
**Para que** eu possa remover projetos que não são mais necessários  

**Prioridade:** Baixa  
**Estimativa:** 3 pontos  
**Dependências:** US-001 (projeto deve existir)  

---

## US-017: Editar Etapa
**Como** membro da equipe  
**Eu quero** editar uma etapa do projeto (nome, ordem)  
**Para que** eu possa ajustar o fluxo de trabalho conforme necessário  

**Prioridade:** Baixa  
**Estimativa:** 3 pontos  
**Dependências:** US-002 (etapas devem existir)  

---

## US-018: Excluir Etapa
**Como** membro da equipe  
**Eu quero** excluir uma etapa do projeto  
**Para que** eu possa remover etapas que não são mais utilizadas  

**Prioridade:** Baixa  
**Estimativa:** 5 pontos  
**Dependências:** US-002 (etapas devem existir), deve lidar com tarefas existentes na etapa  

---

## Personas Identificadas

### Persona 1: Gerente de Projeto
- **Perfil:** Responsável por múltiplos projetos e equipes
- **Necessidades:** Visibilidade geral, organização por contexto
- **Pain Points:** Falta de organização, dificuldade em acompanhar múltiplos projetos

### Persona 2: Desenvolvedor/Membro da Equipe
- **Perfil:** Trabalha em tarefas específicas dentro de projetos
- **Necessidades:** Interface rápida, atualização fácil de status, visão clara do que fazer
- **Pain Points:** Atualização manual de status, falta de visibilidade do progresso

### Persona 3: Designer/Planejador
- **Perfil:** Precisa visualizar o fluxo de trabalho
- **Necessidades:** Interface visual, drag and drop intuitivo
- **Pain Points:** Sistemas complexos, falta de feedback visual

---

## Jornada do Usuário

### Fluxo Principal: Criar e Gerenciar Projeto Kanban

1. **Criação Inicial**
   - Usuário cria um novo projeto
   - Sistema solicita nome e descrição do projeto
   - Usuário confirma criação

2. **Configuração de Etapas**
   - Usuário visualiza projeto vazio
   - Usuário cria etapas padrão (Backlog, Todo, Doing, Done)
   - Usuário pode customizar nomes das etapas

3. **Adição de Tarefas**
   - Usuário seleciona uma etapa
   - Usuário cria nova tarefa
   - Usuário adiciona descrição e detalhes

4. **Organização via Drag and Drop**
   - Usuário arrasta tarefa para reordenar dentro da etapa
   - Usuário arrasta tarefa para outra etapa (mudança de status)
   - Sistema atualiza automaticamente a posição/status

5. **Gestão de Subtarefas**
   - Usuário abre detalhes da tarefa
   - Usuário adiciona subtarefas
   - Usuário marca subtarefas como concluídas conforme avança

6. **Acompanhamento**
   - Usuário visualiza progresso através da distribuição de tarefas nas etapas
   - Usuário identifica gargalos visualmente

