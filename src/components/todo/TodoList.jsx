import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ tasks, onEdit, onDelete, onToggle, onReorder }) {
  return (
    <div style={{display:'grid', gap:12}}>
      {tasks.map((t, idx) => (
        <div
          key={t.id}
          className="card"
          style={{display:'flex', alignItems:'center', padding:12}}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', idx)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const from = Number(e.dataTransfer.getData('text/plain'))
            const to = idx
            if (!Number.isNaN(from) && typeof onReorder === 'function') onReorder(from, to)
          }}
        >
          <TodoItem task={t} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
        </div>
      ))}
    </div>
  )
}
