import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
       
          <h1>Get started</h1>
         
        <div className="container">
          <div className="b1">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
         +
        </button>
        </div>
        
        <div className="b2">
        <button1
          type="button"         
           className="counter"
          onClick={() => setCount((count) => count - 1)}
        >
         -
        </button1>
        </div>
        </div>
        <h1>{count}</h1>
      </section>

      
    </>
  )
}

export default App
