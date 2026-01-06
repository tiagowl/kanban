'use client'

import { useState } from 'react'
import { useLabels } from '@/hooks/useLabels'
import { Label } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { LabelForm } from './LabelForm'

interface LabelManagerProps {
  projectId: string
}

export function LabelManager({ projectId }: LabelManagerProps) {
  const { labels, loading, createLabel, updateLabel, deleteLabel } = useLabels(projectId)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingLabel, setEditingLabel] = useState<Label | null>(null)
  const [deletingLabel, setDeletingLabel] = useState<Label | null>(null)

  const handleCreate = async (label: Label) => {
    await createLabel(label)
    setIsCreateOpen(false)
  }

  const handleUpdate = async (label: Label) => {
    if (editingLabel) {
      await updateLabel(editingLabel.id, label)
      setEditingLabel(null)
    }
  }

  const handleDelete = async () => {
    if (deletingLabel) {
      await deleteLabel(deletingLabel.id)
      setDeletingLabel(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Etiquetas do Projeto</h3>
        <Button onClick={() => setIsCreateOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nova Etiqueta
        </Button>
      </div>

      {labels.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhuma etiqueta criada</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsCreateOpen(true)}
          >
            Criar Primeira Etiqueta
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {labels.map((label) => (
            <div
              key={label.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: label.color }}
                />
                <span className="font-medium truncate">{label.name}</span>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingLabel(label)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => setDeletingLabel(label)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Etiqueta</DialogTitle>
            <DialogDescription>
              Crie uma nova etiqueta para organizar suas tarefas
            </DialogDescription>
          </DialogHeader>
          <LabelForm
            projectId={projectId}
            onSuccess={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingLabel} onOpenChange={(open) => !open && setEditingLabel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Etiqueta</DialogTitle>
            <DialogDescription>
              Atualize as informações da etiqueta
            </DialogDescription>
          </DialogHeader>
          {editingLabel && (
            <LabelForm
              projectId={projectId}
              initialData={editingLabel}
              onSuccess={handleUpdate}
              onCancel={() => setEditingLabel(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deletingLabel} onOpenChange={(open) => !open && setDeletingLabel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Etiqueta</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a etiqueta "{deletingLabel?.name}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingLabel(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

