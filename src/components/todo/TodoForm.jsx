import React, { useState, useEffect } from 'react'

export default function TodoForm({ onAdd, initial = '' }) {
  const [text, setText] = useState(initial)
  const [error, setError] = useState(null)

  useEffect(() => setText(initial), [initial])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (!onAdd) return
    const ok = onAdd(text)
    if (ok) setText('')
    else setError('Please enter a valid task.')
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <div className="form-field" style={{display:'flex', gap:8}}>
        <input
          className="form-input"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Task description"
        />
        <button className="btn btn-primary" type="submit">Add</button>
      </div>
      {error && <div className="form-error">{error}</div>}
    </form>
  )
}
