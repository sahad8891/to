import React, { useState } from 'react'

export default function TodoItem({ task, onEdit, onDelete, onToggle }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(task.text)
  const [error, setError] = useState(null)

  const save = () => {
    setError(null)
    const ok = onEdit(task.id, value)
    if (ok) setEditing(false)
    else setError('Task cannot be empty')
  }

  return (
    <div className="todo-item" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
      <div style={{display:'flex', alignItems:'center', gap:12, flex:1}}>
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} aria-label={`Mark ${task.text} completed`} />
        <div style={{flex:1}}>
          {editing ? (
            <input value={value} onChange={(e) => setValue(e.target.value)} className={`form-input`} />
          ) : (
            <div style={{textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--muted)' : 'inherit'}}>{task.text}</div>
          )}
          <div className="muted" style={{fontSize:12}}>{new Date(task.createdAt).toLocaleString()}</div>
        </div>
      </div>

      <div style={{display:'flex', gap:8}}>
        {editing ? (
          <>
            <button className="btn btn-sm btn-primary" onClick={save}>Save</button>
            <button className="btn btn-sm btn-outline" onClick={() => { setEditing(false); setValue(task.text); setError(null); }}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-ghost" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-sm btn-outline" onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}
      </div>

      {error && <div className="form-error">{error}</div>}
    </div>
  )
}
