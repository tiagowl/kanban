# Backlog Priorizado - Sistema Kanban

## Método de Priorização
Priorização baseada em:
- **Valor de Negócio:** Impacto direto na funcionalidade core do sistema
- **Esforço:** Complexidade técnica estimada (pontos de história)
- **Dependências:** Features que bloqueiam outras funcionalidades
- **Riscos:** Potenciais problemas técnicos ou de negócio

## Legenda de Prioridades
- **Crítica (P0):** Bloqueador, deve ser feito primeiro
- **Alta (P1):** Essencial para MVP
- **Média (P2):** Importante mas não bloqueador
- **Baixa (P3):** Nice to have, pode ser feito posteriormente

---

## Sprint 1 - Fundação (MVP Core)

### P0 - Crítica
| ID | User Story | Pontos | Justificativa |
|---|---|---|---|
| US-001 | Criar Projeto | 3 | Base do sistema, todas as outras features dependem disso |
| US-002 | Criar Etapa no Projeto | 3 | Estrutura essencial para organizar tarefas |
| US-003 | Criar Tarefa na Etapa | 5 | Funcionalidade core do sistema |
| US-004 | Visualizar Tarefas por Etapa | 5 | Sem visualização, o sistema não tem valor |

**Total Sprint 1:** 16 pontos

---

## Sprint 2 - Interatividade Básica

### P1 - Alta
| ID | User Story | Pontos | Justificativa |
|---|---|---|---|
| US-005 | Mover Tarefa entre Posições (Drag and Drop) | 8 | Funcionalidade core do Kanban, permite priorização visual |
| US-006 | Mover Tarefa entre Etapas (Drag and Drop) | 8 | Diferencial competitivo, essencial para workflow |
| US-012 | Interface Moderna e Intuitiva | 13 | UX é crítica para adoção, deve ser implementada desde o início |
| US-013 | Editar Tarefa | 5 | Necessário para correções e atualizações |

**Total Sprint 2:** 34 pontos

---

## Sprint 3 - Gestão Detalhada de Tarefas

### P1 - Alta (continuação)
| ID | User Story | Pontos | Justificativa |
|---|---|---|---|
| US-014 | Excluir Tarefa | 3 | Necessário para manutenção do backlog |

### P2 - Média
| ID | User Story | Pontos | Justificativa |
|---|---|---|---|
| US-007 | Criar Subtarefas | 5 | Melhora a granularidade do gerenciamento |
| US-008 | Editar Subtarefa | 3 | Necessário para atualizar informações |
| US-009 | Excluir Subtarefa | 2 | Completa CRUD básico de subtarefas |
| US-010 | Marcar Subtarefa como Concluída | 3 | Tracking de progresso dentro da tarefa |
| US-011 | Desmarcar Subtarefa Concluída | 2 | Necessário para correção de erros |

**Total Sprint 3:** 20 pontos

---

## Sprint 4 - Gestão de Projetos e Etapas

### P2 - Média
| ID | User Story | Pontos | Justificativa |
|---|---|---|---|
| US-015 | Editar Projeto | 3 | Permite atualização de informações do projeto |
| US-017 | Editar Etapa | 3 | Permite ajustar fluxo de trabalho |

### P3 - Baixa
| ID | User Story | Pontos | Justificativa |
|---|---|---|---|
| US-016 | Excluir Projeto | 3 | Funcionalidade de manutenção |
| US-018 | Excluir Etapa | 5 | Requer lógica para lidar com tarefas existentes |

**Total Sprint 4:** 14 pontos

---

## Resumo por Prioridade

### Prioridade Crítica (P0) - 16 pontos
- US-001, US-002, US-003, US-004

### Prioridade Alta (P1) - 42 pontos
- US-005, US-006, US-012, US-013, US-014

### Prioridade Média (P2) - 16 pontos
- US-007, US-008, US-009, US-010, US-011, US-015, US-017

### Prioridade Baixa (P3) - 8 pontos
- US-016, US-018

**Total Geral:** 82 pontos

---

## Mapa de Dependências

```
US-001 (Criar Projeto)
  ├── US-002 (Criar Etapa)
  │     ├── US-003 (Criar Tarefa)
  │     │     ├── US-004 (Visualizar Tarefas)
  │     │     ├── US-005 (Drag & Drop - Posição)
  │     │     ├── US-006 (Drag & Drop - Etapa)
  │     │     ├── US-007 (Criar Subtarefas)
  │     │     │     ├── US-008 (Editar Subtarefa)
  │     │     │     ├── US-009 (Excluir Subtarefa)
  │     │     │     ├── US-010 (Marcar Subtarefa)
  │     │     │     └── US-011 (Desmarcar Subtarefa)
  │     │     ├── US-013 (Editar Tarefa)
  │     │     └── US-014 (Excluir Tarefa)
  │     ├── US-017 (Editar Etapa)
  │     └── US-018 (Excluir Etapa)
  ├── US-015 (Editar Projeto)
  └── US-016 (Excluir Projeto)

US-012 (Interface Moderna) - Aplicável a todas as features
```

---

## Riscos Identificados

### Riscos Técnicos
1. **Drag and Drop (US-005, US-006)**
   - **Risco:** Complexidade de implementação, especialmente com reordenação e persistência
   - **Mitigação:** Usar bibliotecas consolidadas (ex: dnd-kit, react-beautiful-dnd)
   - **Impacto:** Alto se não funcionar corretamente

2. **Performance com Muitas Tarefas**
   - **Risco:** Sistema pode ficar lento com centenas de tarefas
   - **Mitigação:** Implementar paginação ou virtualização
   - **Impacto:** Médio, pode ser endereçado em iterações futuras

3. **Neon SDK e API Routes**
   - **Risco:** Equipe pode não ter experiência com Neon SDK
   - **Mitigação:** Alocar tempo para aprendizado e testes
   - **Impacto:** Médio

### Riscos de Negócio
1. **Adoção da Interface**
   - **Risco:** Interface pode não ser intuitiva o suficiente
   - **Mitigação:** Testes de usabilidade com usuários reais (US-012)
   - **Impacto:** Alto se usuários não adotarem

2. **Funcionalidades Faltantes**
   - **Risco:** MVP pode não atender todas as necessidades
   - **Mitigação:** Focar no core primeiro, iterar com feedback
   - **Impacto:** Médio

---

## Roadmap Sugerido

### Fase 1 - MVP (Sprints 1-2)
**Objetivo:** Sistema funcional básico com drag and drop
**Features:** Criar projeto/etapa/tarefa, visualizar, drag and drop básico, interface moderna
**Duração Estimada:** 4-6 semanas

### Fase 2 - Funcionalidades Avançadas (Sprint 3)
**Objetivo:** Gestão detalhada de tarefas
**Features:** Subtarefas com CRUD completo
**Duração Estimada:** 2-3 semanas

### Fase 3 - Polimento (Sprint 4)
**Objetivo:** Completar funcionalidades de manutenção
**Features:** Edição e exclusão de projetos e etapas
**Duração Estimada:** 2 semanas

### Fase 4 - Melhorias Futuras (Pós-MVP)
- Notificações
- Filtros e busca
- Atribuição de tarefas a usuários
- Timeline/Gantt view
- Relatórios e métricas
- Integração com outras ferramentas

