import { RouterProvider } from 'react-router'
import Router from './router/Router'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  // Wrap the app with ErrorBoundary to prevent the whole app from crashing
  // if any component throws during render.
  return (
    <ErrorBoundary>
      <div className="app-root">
        <RouterProvider router={Router} />
      </div>
    </ErrorBoundary>
  )
}

export default App