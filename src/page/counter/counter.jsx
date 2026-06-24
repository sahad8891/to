import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <section id="center" className="card" aria-labelledby="counter-title">
      <h1 id="counter-title">Get started</h1>

      <div className="stack" style={{justifyContent:'center', margin:'16px 0'}}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          aria-label="Increment"
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </button>

        <button
          type="button"
          className="btn btn-outline btn-lg"
          aria-label="Decrement"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          disabled={count <= 0}
        >
          -
        </button>
      </div>

      <h1>{count}</h1>
    </section>
  )
}

export default Counter