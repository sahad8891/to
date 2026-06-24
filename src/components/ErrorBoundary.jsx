import React from 'react'
import ErrorMessage from './ErrorMessage'

// Error Boundary to catch rendering errors in subtree and provide fallback UI.
// Logs the error to the console and shows a friendly message instead of crashing the app.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  // Catch rendering errors from child components
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Log for debugging: stack traces, component stack, etc.
    console.error('Unhandled error caught by ErrorBoundary:', error, info)
    // Here you could also send the error to an external logging service
  }

  handleRetry = () => {
    // Reset error state to try rendering children again
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ui-container" style={{paddingTop:24}}>
          <div className="card">
            <ErrorMessage
              title="Unexpected error"
              message="An unexpected problem occurred. Try reloading or contact support."
              onRetry={this.handleRetry}
            />
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
