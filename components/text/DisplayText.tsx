'use client'
 
import React from 'react'

export type TextItem = {
  id: string
  title: string
  content: string
  category?: string | null
  grade?: string | null
  isActive: boolean
  wordCount?: number
}

type DisplayTextProps = {
  texts: TextItem[]
  onEdit: (text: TextItem) => void
  onDelete: (id: string) => void
  onMoveUp: (idx: number) => void
  onMoveDown: (idx: number) => void
}

export default function DisplayText({
  texts,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: DisplayTextProps) {
  return (
    <ul className="space-y-2">
      {texts.map((text, idx) => (
        <li key={text.id} className="border p-3 flex items-center justify-between bg-white rounded">
          <div>
            <div className="font-bold">{text.title}</div>
            <div className="text-xs text-gray-500">
              {text.category ?? ''}{' '}
              {text.grade ?? ''}
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(text)}
              className="px-2 py-1 bg-yellow-200 rounded text-xs"
            >
              Éditer
            </button>
            <button
              onClick={() => onDelete(text.id)}
              className="px-2 py-1 bg-red-200 rounded text-xs"
            >
              Supprimer
            </button>
            <button
              disabled={idx === 0}
              onClick={() => onMoveUp(idx)}
              className="px-2 py-1 bg-gray-200 rounded text-xs"
            >
              ▲
            </button>
            <button
              disabled={idx === texts.length - 1}
              onClick={() => onMoveDown(idx)}
              className="px-2 py-1 bg-gray-200 rounded text-xs"
            >
              ▼
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
