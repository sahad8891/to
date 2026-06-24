import React from 'react'

export default function FilterButtons({ filter, setFilter, clearCompleted, pendingCount }) {
  return (
    <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
      <div style={{display:'flex', gap:6}}>
        <button className={`btn btn-sm ${filter==='all' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn btn-sm ${filter==='active' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('active')}>Active</button>
        <button className={`btn btn-sm ${filter==='completed' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <div style={{marginLeft:'auto'}} className="muted">{pendingCount} pending</div>

      <button className="btn btn-sm btn-outline" onClick={clearCompleted}>Clear completed</button>
    </div>
  )
}
