# Documentação de Requisitos - Sistema Kanban

## 1. Visão Geral do Produto

### 1.1 Objetivo
Desenvolver um sistema de gerenciamento de projetos baseado no método Kanban, permitindo que equipes organizem, visualizem e gerenciem seu trabalho através de um board interativo com drag and drop.

### 1.2 Escopo
Sistema web responsivo para criação e gestão de projetos Kanban, incluindo:
- Gestão hierárquica: Projeto → Etapa → Tarefa → Subtarefa
- Interface interativa com drag and drop
- Funcionalidades CRUD completas para todos os níveis
- Interface moderna e intuitiva

### 1.3 Tecnologias
- **Frontend:** Next.js (React Framework)
- **Backend:** Next.js API Routes
- **Banco de Dados:** Neon (via SDK do Neon)
- **Estilo:** Design moderno com boas práticas de UX/UI

---

## 2. Análise de Requisitos

### 2.1 Objetivos de Negócio

#### Objetivos Primários
1. **Organização de Trabalho**
   - Permitir que equipes organizem tarefas por projeto
   - Visualizar status de cada tarefa de forma clara
   - Facilitar priorização através de reordenação visual

2. **Aumento de Produtividade**
   - Reduzir tempo para atualizar status de tarefas
   - Facilitar identificação de gargalos
   - Permitir quebra de tarefas complexas em subtarefas

3. **Transparência**
   - Visibilidade do progresso de cada projeto
   - Rastreamento de conclusão através de subtarefas
   - Visualização clara do fluxo de trabalho

#### Objetivos Secundários
- Base para funcionalidades futuras (colaboração, métricas, integrações)
- Experiência de usuário superior para diferenciar no mercado

---

### 2.2 Usuários-Alvo (Personas)

#### Persona 1: Gerente de Projeto
**Perfil Demográfico:**
- Idade: 30-50 anos
- Função: Gestão de múltiplos projetos
- Experiência técnica: Intermediária

**Necessidades:**
- Criar e gerenciar múltiplos projetos simultaneamente
- Visualizar status geral de todos os projetos
- Organizar tarefas por contexto/cliente
- Acompanhar progresso das equipes

**Pain Points:**
- Dificuldade em gerenciar múltiplos projetos em ferramentas simples
- Falta de visibilidade do status real do trabalho
- Ferramentas complexas demais para necessidades simples

#### Persona 2: Desenvolvedor/Membro da Equipe
**Perfil Demográfico:**
- Idade: 25-40 anos
- Função: Execução de tarefas técnicas
- Experiência técnica: Avançada

**Necessidades:**
- Interface rápida para atualizar status
- Ver claramente o que precisa ser feito
- Quebrar tarefas complexas em partes menores
- Atualizar progresso sem interrupções

**Pain Points:**
- Atualização manual de status é trabalhosa
- Falta de feedback visual do progresso
- Ferramentas que interrompem o fluxo de trabalho

#### Persona 3: Designer/Planejador
**Perfil Demográfico:**
- Idade: 25-45 anos
- Função: Design e planejamento visual
- Experiência técnica: Básica a Intermediária

**Necessidades:**
- Interface visualmente agradável
- Facilidade para reorganizar tarefas
- Feedback visual imediato das ações
- Compreensão intuitiva do sistema

**Pain Points:**
- Sistemas com interface confusa ou feia
- Dificuldade em entender onde encontrar funcionalidades
- Falta de feedback ao realizar ações

---

### 2.3 Funcionalidades Principais

#### 2.3.1 Gestão Hierárquica

**F01 - Gestão de Projetos**
- Criar projeto com nome e descrição
- Editar informações do projeto
- Excluir projeto (com confirmação e tratamento de dependências)
- Listar todos os projetos do usuário

**F02 - Gestão de Etapas**
- Criar etapas dentro de um projeto (ex: Backlog, Todo, Doing, Done)
- Editar nome e propriedades da etapa
- Excluir etapa (com opção de mover ou excluir tarefas)
- Reordenar etapas (futuro)

**F03 - Gestão de Tarefas**
- Criar tarefa em uma etapa específica
- Editar tarefa (título, descrição, metadata)
- Excluir tarefa
- Visualizar tarefas organizadas por etapa no board Kanban

**F04 - Gestão de Subtarefas**
- Criar lista de subtarefas dentro de uma tarefa
- Editar subtarefa
- Excluir subtarefa
- Marcar/desmarcar subtarefa como concluída

#### 2.3.2 Interatividade Drag and Drop

**F05 - Reordenação de Tarefas**
- Arrastar tarefa para reordenar dentro da mesma etapa
- Feedback visual durante o drag
- Persistência automática da nova ordem
- Suporte a desktop (mouse) e mobile (touch)

**F06 - Mudança de Status via Drag**
- Arrastar tarefa de uma etapa para outra
- Atualização automática do status
- Feedback visual de áreas válidas para soltar
- Tratamento de erros durante movimentação

#### 2.3.3 Interface e Experiência

**F07 - Design Moderno**
- Interface limpa e minimalista
- Cores e tipografia consistentes
- Animações suaves e feedback visual
- Layout responsivo (mobile, tablet, desktop)

**F08 - Estados da Interface**
- Loading states durante carregamento
- Empty states quando não há dados
- Error states com mensagens claras
- Success feedback para ações completadas

---

### 2.4 Restrições e Limitações

#### 2.4.1 Restrições Técnicas

**Tecnologias Obrigatórias:**
- Next.js (React Framework) - obrigatório
- API Routes do Next.js para backend - obrigatório
- Neon SDK para interação com banco de dados - obrigatório

**Plataforma:**
- Sistema web (não precisa de app nativo inicialmente)
- Suporte a navegadores modernos (Chrome, Firefox, Safari, Edge)

**Performance:**
- Carregamento inicial < 3 segundos
- Interações < 100ms de resposta visual
- API responses < 500ms (simples) / < 2s (complexas)

#### 2.4.2 Restrições de Negócio

**Escopo MVP:**
- Foco em funcionalidades core do Kanban
- Sem autenticação de usuários no MVP (pode ser futuro)
- Sem colaboração em tempo real no MVP (pode ser futuro)
- Sem notificações no MVP

**Limitações de Dados:**
- Considerar performance com:
  - Até 100 projetos por usuário
  - Até 20 etapas por projeto
  - Até 500 tarefas por projeto
  - Até 50 subtarefas por tarefa

#### 2.4.3 Restrições de Design

**Acessibilidade:**
- Mínimo WCAG AA (contraste, navegação por teclado)
- Suporte básico a screen readers
- Labels descritivos para todos os elementos interativos

**Compatibilidade:**
- Desktop: resoluções de 1280x720 até 4K
- Tablet: 768px a 1024px
- Mobile: 320px a 767px

---

## 3. Requisitos Funcionais Detalhados

### 3.1 RF01 - Criar Projeto
**Prioridade:** Crítica  
**Complexidade:** Baixa

**Descrição:**
O sistema deve permitir que usuários criem novos projetos com nome e descrição opcional.

**Entrada:**
- Nome do projeto (obrigatório, string, max 255 caracteres)
- Descrição (opcional, texto longo)

**Processamento:**
1. Validar nome não vazio
2. Criar registro no banco via Neon SDK
3. Retornar projeto criado

**Saída:**
- Projeto criado com ID gerado
- Redirecionamento para view do projeto

**Regras de Negócio:**
- Nome é obrigatório
- Nome não pode ser apenas espaços
- Cada projeto tem timestamp de criação

---

### 3.2 RF02 - Criar Etapa
**Prioridade:** Crítica  
**Complexidade:** Baixa

**Descrição:**
O sistema deve permitir criar etapas dentro de um projeto existente.

**Entrada:**
- Nome da etapa (obrigatório)
- ID do projeto (obrigatório)
- Ordem/posição (opcional, padrão: última posição)

**Processamento:**
1. Validar projeto existe
2. Validar nome não vazio
3. Criar etapa vinculada ao projeto
4. Atribuir ordem sequencial

**Saída:**
- Etapa criada e visível no board

**Regras de Negócio:**
- Projeto deve existir
- Nome é obrigatório
- Etapas são ordenadas dentro do projeto

---

### 3.3 RF03 - Criar Tarefa
**Prioridade:** Crítica  
**Complexidade:** Média

**Descrição:**
O sistema deve permitir criar tarefas dentro de uma etapa específica.

**Entrada:**
- Título (obrigatório, string, max 255 caracteres)
- Descrição (opcional, texto longo)
- ID da etapa (obrigatório)
- ID do projeto (obrigatório)
- Ordem/posição (opcional, padrão: última posição)

**Processamento:**
1. Validar etapa existe e pertence ao projeto
2. Validar título não vazio
3. Criar tarefa vinculada à etapa
4. Atribuir ordem sequencial na etapa

**Saída:**
- Tarefa criada e visível na etapa

**Regras de Negócio:**
- Título é obrigatório
- Tarefa pertence a uma única etapa
- Tarefas são ordenadas dentro da etapa

---

### 3.4 RF04 - Visualizar Board Kanban
**Prioridade:** Crítica  
**Complexidade:** Média

**Descrição:**
O sistema deve exibir todas as etapas de um projeto em formato board Kanban, com tarefas organizadas por coluna.

**Entrada:**
- ID do projeto

**Processamento:**
1. Buscar projeto
2. Buscar todas as etapas do projeto ordenadas
3. Para cada etapa, buscar tarefas ordenadas
4. Renderizar board com colunas (etapas) e cards (tarefas)

**Saída:**
- Interface visual do board
- Cada etapa como coluna
- Tarefas como cards dentro das colunas

**Regras de Negócio:**
- Ordem das etapas é respeitada
- Ordem das tarefas dentro de cada etapa é respeitada
- Empty state quando etapa está vazia

---

### 3.5 RF05 - Reordenar Tarefas (Drag and Drop)
**Prioridade:** Alta  
**Complexidade:** Alta

**Descrição:**
O sistema deve permitir arrastar tarefas para reordenar dentro da mesma etapa.

**Entrada:**
- ID da tarefa
- Nova posição/ordem
- ID da etapa (mesma etapa)

**Processamento:**
1. Capturar evento de drag and drop
2. Calcular nova posição/ordem
3. Atualizar ordem de todas as tarefas afetadas
4. Persistir no banco via API
5. Atualizar interface (otimistic update)

**Saída:**
- Tarefa na nova posição
- Interface atualizada

**Regras de Negócio:**
- Ordem deve ser única dentro da etapa
- Todas as tarefas devem manter ordem válida após movimento

---

### 3.6 RF06 - Mover Tarefa entre Etapas (Drag and Drop)
**Prioridade:** Alta  
**Complexidade:** Alta

**Descrição:**
O sistema deve permitir arrastar tarefa de uma etapa para outra, atualizando o status.

**Entrada:**
- ID da tarefa
- ID da etapa origem
- ID da etapa destino

**Processamento:**
1. Validar etapa destino existe
2. Remover tarefa da etapa origem
3. Adicionar tarefa na etapa destino (última posição ou posição especificada)
4. Atualizar vinculação no banco (tarefa.etapa_id)
5. Atualizar interface

**Saída:**
- Tarefa na nova etapa
- Tarefa removida da etapa origem

**Regras de Negócio:**
- Etapa destino deve existir
- Subtarefas acompanham a tarefa (mantêm vínculo)

---

### 3.7 RF07 - Criar Subtarefa
**Prioridade:** Média  
**Complexidade:** Baixa

**Descrição:**
O sistema deve permitir adicionar subtarefas a uma tarefa.

**Entrada:**
- Nome da subtarefa (obrigatório)
- ID da tarefa (obrigatório)

**Processamento:**
1. Validar tarefa existe
2. Validar nome não vazio
3. Criar subtarefa vinculada à tarefa
4. Status inicial: não concluída

**Saída:**
- Subtarefa adicionada à lista

**Regras de Negócio:**
- Nome é obrigatório
- Status inicial sempre não concluído
- Subtarefas são ordenadas por ordem de criação

---

### 3.8 RF08 - Gerenciar Subtarefas (Editar/Excluir/Marcar)
**Prioridade:** Média  
**Complexidade:** Baixa

**Descrição:**
O sistema deve permitir editar, excluir e marcar/desmarcar subtarefas.

**Operações:**
- **Editar:** Modificar nome da subtarefa
- **Excluir:** Remover subtarefa (com confirmação)
- **Marcar:** Alterar status para concluída
- **Desmarcar:** Alterar status para não concluída

**Regras de Negócio:**
- Todas as operações requerem subtarefa existente
- Exclusão requer confirmação
- Marcação é reversível

---

## 4. Requisitos Não Funcionais

### 4.1 Performance
- **RNF01:** Tempo de carregamento inicial < 3 segundos
- **RNF02:** Interações do usuário respondem visualmente < 100ms
- **RNF03:** API responses < 500ms para operações simples (CRUD básico)
- **RNF04:** API responses < 2s para operações complexas (buscar board completo)

### 4.2 Usabilidade
- **RNF05:** Interface deve ser intuitiva, não requerendo treinamento extenso
- **RNF06:** Mensagens de erro devem ser claras e acionáveis
- **RNF07:** Feedback visual para todas as ações do usuário
- **RNF08:** Confirmações obrigatórias para operações destrutivas

### 4.3 Acessibilidade
- **RNF09:** Conformidade mínima WCAG AA
- **RNF10:** Navegação por teclado funcional
- **RNF11:** Contraste adequado em todos os elementos
- **RNF12:** Labels descritivos para screen readers

### 4.4 Compatibilidade
- **RNF13:** Funcionamento em navegadores modernos (últimas 2 versões)
- **RNF14:** Design responsivo (mobile, tablet, desktop)
- **RNF15:** Funcionalidade drag and drop em desktop e mobile

### 4.5 Segurança
- **RNF16:** Validação de dados no frontend e backend
- **RNF17:** Sanitização de inputs para prevenir XSS
- **RNF18:** Tratamento de erros não expõe informações sensíveis

### 4.6 Manutenibilidade
- **RNF19:** Código deve seguir padrões do Next.js e React
- **RNF20:** Estrutura de pastas organizada e documentada
- **RNF21:** Componentes reutilizáveis

---

## 5. Modelo de Dados

### 5.1 Entidades Principais

#### Projeto
```
- id: UUID (PK)
- nome: String (obrigatório, max 255)
- descricao: Text (opcional)
- criado_em: Timestamp
- atualizado_em: Timestamp
```

#### Etapa
```
- id: UUID (PK)
- projeto_id: UUID (FK -> Projeto)
- nome: String (obrigatório, max 255)
- ordem: Integer (ordem dentro do projeto)
- criado_em: Timestamp
- atualizado_em: Timestamp
```

#### Tarefa
```
- id: UUID (PK)
- etapa_id: UUID (FK -> Etapa)
- projeto_id: UUID (FK -> Projeto) [redundante mas útil para queries]
- titulo: String (obrigatório, max 255)
- descricao: Text (opcional)
- ordem: Integer (ordem dentro da etapa)
- criado_em: Timestamp
- atualizado_em: Timestamp
```

#### Subtarefa
```
- id: UUID (PK)
- tarefa_id: UUID (FK -> Tarefa)
- nome: String (obrigatório, max 255)
- concluida: Boolean (default: false)
- ordem: Integer (ordem dentro da tarefa)
- criado_em: Timestamp
- atualizado_em: Timestamp
```

### 5.2 Relacionamentos
- 1 Projeto → N Etapas
- 1 Etapa → N Tarefas
- 1 Tarefa → N Subtarefas
- Tarefa também referencia Projeto (para facilitar queries)

---

## 6. Fluxos de Trabalho

### 6.1 Fluxo Principal: Criar e Usar Projeto Kanban

1. **Usuário cria projeto**
   - Acessa tela de criação
   - Preenche nome (obrigatório) e descrição (opcional)
   - Confirma criação
   - Sistema cria projeto e redireciona

2. **Usuário cria etapas**
   - Visualiza projeto vazio
   - Cria etapas padrão (ex: Backlog, Todo, Doing, Done)
   - Etapas aparecem como colunas no board

3. **Usuário adiciona tarefas**
   - Seleciona etapa
   - Cria tarefa com título
   - Tarefa aparece como card na etapa

4. **Usuário organiza via drag and drop**
   - Arrasta tarefa para reordenar
   - Arrasta tarefa para outra etapa (muda status)
   - Sistema atualiza automaticamente

5. **Usuário gerencia subtarefas**
   - Abre detalhes da tarefa
   - Adiciona subtarefas
   - Marca subtarefas como concluídas

### 6.2 Fluxo de Drag and Drop

1. **Início do Drag**
   - Usuário clica e segura card da tarefa
   - Sistema mostra feedback visual (card "flutuando")
   - Outros elementos mostram áreas de drop

2. **Durante o Drag**
   - Usuário move mouse/ dedo
   - Sistema mostra indicador de posição
   - Áreas válidas são destacadas
   - Áreas inválidas são bloqueadas

3. **Drop**
   - Usuário solta em área válida
   - Sistema calcula nova posição/etapa
   - Atualização otimista na interface
   - Persistência no banco via API
   - Confirmação visual de sucesso

4. **Tratamento de Erro**
   - Se API falhar, reverter para posição original
   - Mostrar mensagem de erro
   - Permitir retry

---

## 7. Interface e Design

### 7.1 Princípios de Design

**Clareza:**
- Hierarquia visual clara
- Informações importantes em destaque
- Menos é mais

**Consistência:**
- Padrões de cores e tipografia
- Componentes reutilizáveis
- Comportamentos previsíveis

**Feedback:**
- Todas as ações têm resposta visual
- Loading states claros
- Mensagens de erro/sucesso

**Eficiência:**
- Ações comuns acessíveis rapidamente
- Atalhos de teclado onde apropriado
- Drag and drop para ações frequentes

### 7.2 Componentes Principais

- **Board View:** Container principal com colunas (etapas)
- **Column:** Representa uma etapa, contém lista de tarefas
- **Card:** Representa uma tarefa, draggeable
- **Task Modal:** Detalhes e gestão de subtarefas
- **Form Components:** Criação/edição de projetos, etapas, tarefas

### 7.3 Paleta de Cores (Sugestão)

- **Primária:** Azul moderno (#3B82F6 ou similar)
- **Secundária:** Cinza neutro (#6B7280)
- **Sucesso:** Verde (#10B981)
- **Aviso:** Amarelo (#F59E0B)
- **Erro:** Vermelho (#EF4444)
- **Background:** Branco/Cinza claro (#FFFFFF / #F9FAFB)

### 7.4 Tipografia (Sugestão)

- **Títulos:** Inter, SF Pro, ou sistema sans-serif
- **Corpo:** Mesma família, tamanhos responsivos
- **Hierarquia:** H1 (24-32px), H2 (20-24px), Body (16px)

---

## 8. APIs e Integrações

### 8.1 Estrutura de API Routes (Next.js)

```
/api
  /projects
    GET    /          - Listar projetos
    POST   /          - Criar projeto
    GET    /[id]      - Obter projeto
    PUT    /[id]      - Atualizar projeto
    DELETE /[id]      - Excluir projeto

  /stages
    GET    /          - Listar etapas de um projeto
    POST   /          - Criar etapa
    PUT    /[id]      - Atualizar etapa
    DELETE /[id]      - Excluir etapa

  /tasks
    GET    /          - Listar tarefas (filtro por etapa/projeto)
    POST   /          - Criar tarefa
    PUT    /[id]      - Atualizar tarefa
    DELETE /[id]      - Excluir tarefa
    PATCH  /[id]/move - Mover tarefa (reordenar ou mudar etapa)

  /subtasks
    GET    /          - Listar subtarefas de uma tarefa
    POST   /          - Criar subtarefa
    PUT    /[id]      - Atualizar subtarefa
    DELETE /[id]      - Excluir subtarefa
    PATCH  /[id]/toggle - Alternar status concluída
```

### 8.2 Formato de Resposta Padrão

**Sucesso:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

**Erro:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem amigável",
    "details": { ... }
  }
}
```

---

## 9. Riscos e Mitigações

### 9.1 Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Complexidade do Drag and Drop | Alta | Alto | Usar bibliotecas consolidadas, alocar tempo extra |
| Performance com muitos dados | Média | Médio | Implementar paginação/virtualização se necessário |
| Curva de aprendizado Neon SDK | Média | Médio | Alocar tempo de aprendizado, testes iniciais |
| Conflitos de edição simultânea | Baixa | Médio | Implementar versionamento ou locks (futuro) |

### 9.2 Riscos de Negócio

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Interface não intuitiva | Média | Alto | Testes de usabilidade, iterações com feedback |
| MVP não atende necessidades | Média | Médio | Foco no core, backlog para melhorias |
| Falta de funcionalidades essenciais | Baixa | Médio | Revisão constante do backlog |

---

## 10. Glossário

- **Board:** Visualização principal do Kanban, mostra etapas como colunas
- **Card:** Representação visual de uma tarefa no board
- **Column:** Coluna no board, representa uma etapa
- **Drag and Drop:** Funcionalidade de arrastar e soltar elementos
- **Etapa:** Fase do fluxo de trabalho (ex: Todo, Doing, Done)
- **Kanban:** Método de gestão visual de trabalho
- **MVP:** Minimum Viable Product (Produto Viável Mínimo)
- **Neon:** Serviço de banco de dados PostgreSQL serverless
- **Subtarefa:** Item menor dentro de uma tarefa maior
- **Tarefa:** Unidade de trabalho a ser realizada

---

## 11. Anexos

### 11.1 Referências
- [Next.js Documentation](https://nextjs.org/docs)
- [Neon SDK Documentation](https://neon.tech/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Kanban Method](https://kanban.university/)

### 11.2 Histórico de Versões

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0 | 2024 | Product Owner | Documento inicial de requisitos |

---

**Fim do Documento**

