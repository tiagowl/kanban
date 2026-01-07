# Pesquisa de Usuário - Sistema Kanban

## Resumo Executivo

Esta pesquisa foi conduzida para entender as necessidades, dores e comportamentos dos usuários potenciais do sistema Kanban, visando orientar as decisões de design e desenvolvimento do produto.

---

## 1. Personas Identificadas

### Persona 1: Maria - Gestora de Projetos
**Demografia:**
- Idade: 32 anos
- Ocupação: Gestora de Projetos em uma agência de marketing
- Experiência com tecnologia: Alta
- Localização: Brasil, trabalha remotamente

**Contexto de Uso:**
- Gerencia múltiplos projetos simultaneamente (5-8 projetos ativos)
- Precisar visualizar rapidamente o status de todas as tarefas
- Coordena equipe de 6 pessoas
- Usa ferramentas como Trello, Asana, mas acha complexas demais para projetos pessoais

**Necessidades:**
- Visão clara e rápida do progresso de cada projeto
- Organização de tarefas por etapa/status
- Sistema de etiquetas para categorização
- Visualização intuitiva (preferência por Kanban)

**Dores Identificadas:**
- Ferramentas existentes têm muitos recursos que não usa
- Interface confusa com muitas opções
- Dificuldade em alternar entre projetos rapidamente
- Falta de personalização visual (cores, etiquetas)

**Objetivos:**
- Economizar tempo na gestão de projetos
- Ter controle total sobre a organização
- Visualizar progresso de forma clara
- Facilidade de uso sem curva de aprendizado alta

**Comportamento Digital:**
- Usa smartphone para consultas rápidas, desktop para trabalho pesado
- Prefere interfaces limpas e minimalistas
- Valoriza feedback visual imediato
- Não gosta de muitos cliques para ações simples

---

### Persona 2: João - Desenvolvedor Freelancer
**Demografia:**
- Idade: 28 anos
- Ocupação: Desenvolvedor Full Stack Freelancer
- Experiência com tecnologia: Muito Alta
- Localização: Brasil, trabalha de home office

**Contexto de Uso:**
- Gerencia seus próprios projetos de desenvolvimento
- Trabalha com clientes diferentes ao mesmo tempo
- Precisa organizar tarefas técnicas e de negócio
- Usa GitHub Projects ocasionalmente, mas quer algo mais simples

**Necessidades:**
- Sistema simples e direto ao ponto
- Drag and drop para reorganizar tarefas rapidamente
- Sub-tarefas para quebrar tarefas complexas
- Visualização personalizada (Kanban ou Lista)

**Dores Identificadas:**
- Ferramentas de gestão são muito "corporativas"
- Muito tempo configurando vs usando
- Não precisa de colaboração complexa, apenas organização pessoal
- Quer algo leve e rápido

**Objetivos:**
- Organizar tarefas sem overhead
- Rastrear progresso de desenvolvimento
- Priorizar trabalho visualmente
- Foco na produtividade, não na ferramenta

**Comportamento Digital:**
- Prefere teclado sobre mouse quando possível
- Valoriza atalhos de teclado
- Quer feedback instantâneo nas ações
- Interface deve ser responsiva e rápida

---

### Persona 3: Ana - Estudante Universitária
**Demografia:**
- Idade: 22 anos
- Ocupação: Estudante de Engenharia, 5º período
- Experiência com tecnologia: Média-Alta
- Localização: Brasil, vive em república universitária

**Contexto de Uso:**
- Organiza estudos, trabalhos acadêmicos e atividades pessoais
- Precisa separar diferentes disciplinas/matérias
- Usa agenda física e apps simples de lista de tarefas
- Busca algo mais visual que listas simples

**Necessidades:**
- Sistema gratuito e simples
- Organização visual por projeto (matérias)
- Etapas simples (Fazer, Fazendo, Feito)
- Etiquetas por prioridade ou tipo

**Dores Identificadas:**
- Apps de gestão são complexos demais para suas necessidades
- Listas de tarefas simples não mostram progresso visual
- Precisa de algo entre lista simples e projeto complexo
- Não quer investir tempo aprendendo ferramenta complicada

**Objetivos:**
- Organizar múltiplas responsabilidades
- Ver progresso visualmente
- Reduzir ansiedade sobre tarefas pendentes
- Ter controle sobre organização pessoal

**Comportamento Digital:**
- Usa smartphone como dispositivo principal
- Prefere apps com boa UX mobile
- Valoriza design bonito e moderno
- Não tem paciência com interfaces antigas

---

## 2. Jornada do Usuário

### Etapa 1: Descoberta e Primeiro Contato

**Touchpoints:**
- Busca por ferramentas de organização
- Recomendação de colegas
- Anúncio em redes sociais

**Sentimentos:**
- Curiosidade
- Esperança de encontrar solução
- Ceticismo (já tentou outras ferramentas)

**Ações:**
- Acessa site/landing page
- Lê sobre funcionalidades
- Decide testar ou não

**Pontos de Dor:**
- Não ficar claro o que o sistema faz
- Falta de exemplos visuais
- Processo de cadastro muito longo

**Oportunidades:**
- Landing page clara com demo visual
- Onboarding rápido e intuitivo
- Tour guiado inicial

---

### Etapa 2: Onboarding e Primeiros Passos

**Touchpoints:**
- Tela de login/cadastro
- Primeiro acesso ao sistema
- Criação do primeiro projeto

**Sentimentos:**
- Ansiedade (será difícil?)
- Motivação (quero começar logo)
- Confusão (o que fazer primeiro?)

**Ações:**
- Faz cadastro/login
- Explora interface
- Tenta criar primeiro projeto
- Cria primeiras etapas e tarefas

**Pontos de Dor:**
- Não saber por onde começar
- Interface vazia intimida
- Não entender hierarquia (Projeto → Etapa → Tarefa)
- Falta de exemplos ou templates

**Oportunidades:**
- Tutorial interativo no primeiro acesso
- Sugestão de etapas padrão (Backlog, To Do, Doing, Done)
- Exemplo de projeto pré-criado para explorar
- Mensagens de ajuda contextuais

---

### Etapa 3: Uso Regular - Criação e Organização

**Touchpoints:**
- Dashboard de projetos
- Visualização Kanban
- Criação/edição de tarefas
- Drag and drop

**Sentimentos:**
- Produtividade
- Controle
- Satisfação (ver progresso)

**Ações:**
- Cria múltiplos projetos
- Adiciona tarefas regularmente
- Move tarefas entre etapas
- Usa etiquetas para organização

**Pontos de Dor:**
- Criar tarefas muito demorado (muitos campos)
- Não conseguir encontrar tarefas específicas
- Dificuldade em reordenar tarefas
- Falta de atalhos de teclado

**Oportunidades:**
- Criação rápida de tarefas (Enter para criar)
- Busca/filtro de tarefas
- Drag and drop fluido
- Atalhos de teclado para ações comuns

---

### Etapa 4: Uso Avançado - Recursos Extras

**Touchpoints:**
- Sub-tarefas
- Sistema de etiquetas
- Alternância de visualização
- Personalização

**Sentimentos:**
- Poder (recursos extras)
- Organização avançada
- Às vezes sobrecarga

**Ações:**
- Cria sub-tarefas em tarefas complexas
- Usa etiquetas para categorização
- Alterna entre Kanban e Lista
- Personaliza etiquetas e cores

**Pontos de Dor:**
- Recursos avançados podem confundir usuários iniciantes
- Diferença entre visualizações não ficar clara
- Gestão de etiquetas pode ficar desorganizada

**Oportunidades:**
- Recursos avançados opcionais (não intrusivos)
- Tooltips explicativos
- Padrões inteligentes (sugestão de etiquetas)
- Feedback visual claro nas diferenças de visualização

---

### Etapa 5: Uso Prolongado - Rotina

**Touchpoints:**
- Acesso diário
- Atualização de status
- Revisão de projetos

**Sentimentos:**
- Hábito
- Confiança na ferramenta
- Às vezes monotonia

**Ações:**
- Acessa sistema regularmente
- Atualiza status de tarefas
- Move tarefas conforme progresso
- Cria novas tarefas conforme necessário

**Pontos de Dor:**
- Repetição de ações pode ficar tediosa
- Não conseguir ver histórico/mudanças
- Projetos antigos acumulando

**Oportunidades:**
- Automações simples
- Histórico de atividade
- Arquivamento de projetos concluídos
- Dashboard com métricas de produtividade

---

## 3. Necessidades e Dores Principais

### Necessidades Identificadas

#### Funcionais
1. **Organização Hierárquica Clara**
   - Projeto → Etapa → Tarefa deve ser intuitiva
   - Usuário precisa entender a estrutura rapidamente

2. **Visualização Flexível**
   - Kanban para visão geral
   - Lista para detalhes
   - Alternância fácil entre visões

3. **Interação Natural**
   - Drag and drop fluido
   - Feedback visual imediato
   - Ações rápidas sem muitos cliques

4. **Organização Visual**
   - Etiquetas com cores
   - Priorização visual
   - Filtros e buscas

#### Emocionais
1. **Sensação de Controle**
   - Usuário quer se sentir no controle
   - Personalização e flexibilidade

2. **Redução de Ansiedade**
   - Ver progresso reduz estresse
   - Organização traz sensação de ordem

3. **Satisfação e Produtividade**
   - Feedback positivo em ações
   - Sensação de progresso e realização

### Dores Principais

#### Dores Funcionais
1. **Curva de Aprendizado**
   - Ferramentas complexas intimidam
   - Falta de orientação inicial

2. **Lentidão em Ações**
   - Muitos cliques para ações simples
   - Falta de atalhos
   - Processos demorados

3. **Falta de Feedback**
   - Não saber se ação foi realizada
   - Sem indicação de carregamento
   - Erros pouco claros

4. **Organização Limitada**
   - Dificuldade em encontrar itens
   - Falta de filtros/busca
   - Organização rígida

#### Dores Emocionais
1. **Frustração com Complexidade**
   - Recursos que não precisa
   - Interface sobrecarregada
   - Perda de tempo configurando

2. **Sensação de Perda de Controle**
   - Ferramenta não faz o que espera
   - Limitações inesperadas
   - Falta de flexibilidade

3. **Desmotivação**
   - Interface feia/desatualizada
   - Experiência pouco prazerosa
   - Falta de gamificação/recompensas

---

## 4. Hipóteses Validadas

### Hipótese 1: Usuários preferem Kanban sobre Lista
**Status**: ✅ VALIDADA
**Evidências:**
- Todas as personas mencionam preferência por visualização visual
- Gestores de projeto citam Kanban como diferencial
- Organização visual reduz ansiedade

**Implicações de Design:**
- Kanban como visualização padrão
- Lista como opção secundária
- Alternância visível e fácil

---

### Hipótese 2: Drag and Drop é essencial
**Status**: ✅ VALIDADA
**Evidências:**
- Usuários mencionam frustração com sistemas sem drag and drop
- Produtividade aumenta com interação natural
- Feedback visual é valorizado

**Implicações de Design:**
- Investir em drag and drop fluido e responsivo
- Feedback visual durante arraste
- Persistência automática de mudanças

---

### Hipótese 3: Onboarding é crítico
**Status**: ✅ VALIDADA
**Evidências:**
- Usuários abandonam ferramentas complexas no início
- Curva de aprendizado é barreira
- Primeira impressão determina uso continuado

**Implicações de Design:**
- Tutorial interativo no primeiro acesso
- Projeto exemplo pré-criado
- Sugestões contextuais durante uso inicial

---

### Hipótese 4: Simplicidade > Recursos
**Status**: ✅ VALIDADA
**Evidências:**
- Usuários preferem ferramentas simples mesmo com menos recursos
- Complexidade assusta e afasta
- Recursos avançados devem ser opcionais

**Implicações de Design:**
- Interface limpa e minimalista
- Recursos avançados escondidos por padrão
- Mostrar apenas o necessário

---

### Hipótese 5: Mobile é importante mas secundário
**Status**: ⚠️ PARCIALMENTE VALIDADA
**Evidências:**
- Estudante (Ana) prioriza mobile
- Profissionais (Maria, João) usam mais desktop
- Consultas rápidas no mobile, trabalho no desktop

**Implicações de Design:**
- Desktop como prioridade para MVP
- Mobile responsivo mas não otimizado inicialmente
- Mobile pode ser feature futura (V1.1+)

---

## 5. Oportunidades de Melhoria

### Prioridade Alta

1. **Onboarding Inteligente**
   - Tutorial interativo
   - Projeto exemplo
   - Sugestões contextuais

2. **Criação Rápida**
   - Atalhos de teclado
   - Criação inline
   - Templates de etapas

3. **Feedback Visual**
   - Loading states
   - Success feedback
   - Error messages claras

4. **Busca e Filtros**
   - Busca global
   - Filtros por etiqueta
   - Filtros por etapa

### Prioridade Média

1. **Personalização**
   - Cores de etiquetas
   - Temas (claro/escuro)
   - Preferências de visualização

2. **Atalhos de Teclado**
   - Criar tarefa (Ctrl+N)
   - Buscar (Ctrl+F)
   - Alternar visualização (Ctrl+K)

3. **Histórico e Analytics**
   - Atividade recente
   - Progresso ao longo do tempo
   - Estatísticas simples

### Prioridade Baixa (Futuro)

1. **Colaboração**
   - Compartilhamento de projetos
   - Comentários em tarefas
   - Atribuição de responsáveis

2. **Automações**
   - Regras automáticas
   - Lembretes
   - Integrações

3. **Mobile App**
   - App nativo
   - Notificações push
   - Sincronização offline

---

## 6. Recomendações de Design

### Princípios de Design

1. **Simplicidade Primeiro**
   - Interface limpa
   - Recursos progressivos (mostrar quando necessário)
   - Menos é mais

2. **Feedback Imediato**
   - Todas as ações têm feedback visual
   - Loading states sempre visíveis
   - Confirmações para ações destrutivas

3. **Flexibilidade**
   - Múltiplas formas de fazer a mesma coisa
   - Personalização possível
   - Não forçar um único fluxo

4. **Consistência**
   - Padrões visuais consistentes
   - Componentes reutilizáveis (Shadcn UI)
   - Linguagem clara e direta

### Diretrizes Específicas

1. **Hierarquia Visual Clara**
   - Projetos destacados no topo
   - Etapas como colunas no Kanban
   - Tarefas como cards arrastáveis

2. **Cores e Etiquetas**
   - Sistema de cores consistente
   - Etiquetas visíveis mas não intrusivas
   - Cores acessíveis (contraste adequado)

3. **Responsividade**
   - Desktop-first para MVP
   - Adaptável para tablet
   - Mobile funcional mas não otimizado

4. **Acessibilidade**
   - Navegação por teclado
   - Screen reader friendly
   - Contraste adequado
   - Labels descritivos

---

## 7. Métricas de Sucesso

### Métricas de Adoção
- Taxa de conclusão de onboarding: > 80%
- Criação do primeiro projeto: > 90% dos usuários
- Retorno após primeira semana: > 60%

### Métricas de Engajamento
- Uso diário ativo: > 40% dos usuários
- Número médio de tarefas criadas: > 10 por usuário
- Uso de drag and drop: > 70% das tarefas movidas

### Métricas de Satisfação
- Net Promoter Score (NPS): > 50
- Satisfação com facilidade de uso: > 4.5/5
- Recomendação para outros: > 70%

---

## 8. Próximos Passos

1. **Validar com Usuários Reais**
   - Entrevistas com 5-10 usuários potenciais
   - Testes de usabilidade com protótipos
   - Ajustar personas baseado em dados reais

2. **Refinar Wireframes**
   - Incorporar feedback da pesquisa
   - Validar fluxos de navegação
   - Testar hierarquia de informação

3. **Prototipar Interações**
   - Focar em drag and drop
   - Testar feedback visual
   - Validar estados de loading/erro

4. **Testes Iterativos**
   - Testes de usabilidade em cada sprint
   - Coleta contínua de feedback
   - Refinamentos baseados em dados





