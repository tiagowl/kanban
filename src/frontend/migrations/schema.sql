-- Extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Projetos
CREATE TABLE IF NOT EXISTS projetos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Etapas
CREATE TABLE IF NOT EXISTS etapas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  projeto_id UUID NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  ordem INTEGER NOT NULL DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_projeto FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_etapas_projeto_id ON etapas(projeto_id);
CREATE INDEX IF NOT EXISTS idx_etapas_ordem ON etapas(projeto_id, ordem);

-- Tabela de Tarefas
CREATE TABLE IF NOT EXISTS tarefas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  etapa_id UUID NOT NULL REFERENCES etapas(id) ON DELETE CASCADE,
  projeto_id UUID NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  ordem INTEGER NOT NULL DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_etapa FOREIGN KEY (etapa_id) REFERENCES etapas(id),
  CONSTRAINT fk_projeto_tarefa FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- Índices para tarefas
CREATE INDEX IF NOT EXISTS idx_tarefas_etapa_id ON tarefas(etapa_id);
CREATE INDEX IF NOT EXISTS idx_tarefas_projeto_id ON tarefas(projeto_id);
CREATE INDEX IF NOT EXISTS idx_tarefas_ordem ON tarefas(etapa_id, ordem);

-- Tabela de Subtarefas
CREATE TABLE IF NOT EXISTS subtarefas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tarefa_id UUID NOT NULL REFERENCES tarefas(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  concluida BOOLEAN DEFAULT FALSE,
  ordem INTEGER NOT NULL DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tarefa FOREIGN KEY (tarefa_id) REFERENCES tarefas(id)
);

-- Índices para subtarefas
CREATE INDEX IF NOT EXISTS idx_subtarefas_tarefa_id ON subtarefas(tarefa_id);
CREATE INDEX IF NOT EXISTS idx_subtarefas_ordem ON subtarefas(tarefa_id, ordem);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
DROP TRIGGER IF EXISTS update_projetos_updated_at ON projetos;
CREATE TRIGGER update_projetos_updated_at BEFORE UPDATE ON projetos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_etapas_updated_at ON etapas;
CREATE TRIGGER update_etapas_updated_at BEFORE UPDATE ON etapas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tarefas_updated_at ON tarefas;
CREATE TRIGGER update_tarefas_updated_at BEFORE UPDATE ON tarefas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subtarefas_updated_at ON subtarefas;
CREATE TRIGGER update_subtarefas_updated_at BEFORE UPDATE ON subtarefas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

