import React, { useEffect, useState, useCallback } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Confetti from './Confetti'
import FilterButtons from './FilterButtons'

// Main Todo application component
export default function TodoApp() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, active, completed
  const [message, setMessage] = useState(null)
  const [now, setNow] = useState(new Date())

  // Load tasks from localStorage
  useEffect(() => {
    setLoading(true)
    try {
      const raw = localStorage.getItem('todo.tasks')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setTasks(parsed)
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage', err)
    } finally {
      // small delay to show spinner
      setTimeout(() => setLoading(false), 250)
    }
  }, [])

  // Persist tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('todo.tasks', JSON.stringify(tasks))
    } catch (err) {
      console.error('Failed to save tasks to localStorage', err)
      setMessage({ type: 'error', text: 'Failed to save tasks locally.' })
      setTimeout(() => setMessage(null), 3000)
    }
  }, [tasks])

  // live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const addTask = useCallback((text) => {
    const trimmed = (text || '').trim()
    if (!trimmed) {
      setMessage({ type: 'error', text: 'Task cannot be empty.' })
      setTimeout(() => setMessage(null), 2500)
      return false
    }
    const newTask = { id: Date.now(), text: trimmed, completed: false, createdAt: new Date().toISOString() }
    setTasks((t) => [newTask, ...t])
    setMessage({ type: 'success', text: 'Task added.' })
    setTimeout(() => setMessage(null), 2000)
    return true
  }, [])

  const editTask = useCallback((id, newText) => {
    const trimmed = (newText || '').trim()
    if (!trimmed) {
      setMessage({ type: 'error', text: 'Task cannot be empty.' })
      setTimeout(() => setMessage(null), 2500)
      return false
    }
    setTasks((t) => t.map((it) => it.id === id ? { ...it, text: trimmed } : it))
    setMessage({ type: 'success', text: 'Task updated.' })
    setTimeout(() => setMessage(null), 2000)
    return true
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((t) => t.filter((it) => it.id !== id))
    setMessage({ type: 'success', text: 'Task deleted.' })
    setTimeout(() => setMessage(null), 2000)
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((t) => t.map((it) => it.id === id ? { ...it, completed: !it.completed } : it))
  }, [])

  const [celebrate, setCelebrate] = useState(false)

  const clearCompleted = () => {
    setTasks((t) => t.filter((it) => !it.completed))
    setMessage({ type: 'success', text: 'Completed tasks cleared.' })
    setTimeout(() => setMessage(null), 2000)
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const pendingCount = tasks.filter((t) => !t.completed).length
  const completedCount = tasks.filter((t) => t.completed).length

  // when a task becomes completed, trigger celebration
  useEffect(() => {
    if (tasks.length === 0) return
    const anyRecent = tasks.some((t) => t._justCompleted)
    if (anyRecent) {
      setCelebrate(true)
      const id = setTimeout(() => setCelebrate(false), 1800)
      // remove the marker
      setTasks((prev) => prev.map((p) => ({ ...p, _justCompleted: false })))
      return () => clearTimeout(id)
    }
  }, [tasks])

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <div>
          <h1>To-Do List</h1>
          <div className="muted">{now.toLocaleString()}</div>
        </div>

        <div style={{textAlign:'right'}}>
          <div className="muted">Pending: {pendingCount}</div>
          <div className="muted">Completed: {completedCount}</div>
        </div>
      </div>

      <div style={{marginTop:16}} className="card">
        <TodoForm onAdd={addTask} />

        <div style={{marginTop:12, marginBottom:12}}>
          <FilterButtons filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} pendingCount={pendingCount} />
        </div>

        {message && (
          <div style={{marginBottom:12}}>
            <div className={message.type === 'error' ? 'error-message' : 'card'} style={{padding:12}}>{message.text}</div>
          </div>
        )}

        {loading ? (
          <div style={{padding:24}}><div className="spinner"></div></div>
        ) : (
          <>
            {tasks.length === 0 ? (
              <div className="muted">No tasks yet. Add your first task!</div>
            ) : (
              <>
                <TodoList tasks={filteredTasks} onEdit={editTask} onDelete={deleteTask} onToggle={(id) => {
                  // when toggling to completed mark for celebration
                  setTasks((t) => t.map((it) => it.id === id ? { ...it, completed: !it.completed, _justCompleted: !it.completed } : it))
                }} onReorder={(from, to) => {
                  setTasks((t) => {
                    const copy = [...t]
                    const [moved] = copy.splice(from, 1)
                    copy.splice(to, 0, moved)
                    return copy
                  })
                }} />
                <Confetti active={celebrate} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
