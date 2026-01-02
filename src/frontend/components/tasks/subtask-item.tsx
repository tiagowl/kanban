'use client'

import { useState } from 'react'
import type { Subtarefa } from '@/lib/types'

interface SubtaskItemProps {
  subtask: Subtarefa
  onToggle: () => void
  onDelete: () => void
  onUpdate: (name: string) => void
}

export function SubtaskItem({ subtask, onToggle, onDelete, onUpdate }: SubtaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(subtask.nome)

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(editValue.trim())
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave()
            } else if (e.key === 'Escape') {
              setEditValue(subtask.nome)
              setIsEditing(false)
            }
          }}
          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          autoFocus
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 group">
      <input
        type="checkbox"
        checked={subtask.concluida}
        onChange={onToggle}
        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
      />
      <span
        onClick={() => setIsEditing(true)}
        className={`flex-1 text-sm cursor-text ${
          subtask.concluida
            ? 'line-through text-gray-500'
            : 'text-gray-900'
        }`}
      >
        {subtask.nome}
      </span>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-error-500 transition-opacity p-1"
        aria-label="Excluir subtarefa"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}

