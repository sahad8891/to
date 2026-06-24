import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ tasks, onEdit, onDelete, onToggle }) {
  return (
    <div style={{display:'grid', gap:12}}>
      {tasks.map((t) => (
        <div key={t.id} className="card" style={{display:'flex', alignItems:'center', padding:12}}>
          <TodoItem task={t} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
        </div>
      ))}
    </div>
  )
}
