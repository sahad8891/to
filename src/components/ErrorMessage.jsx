import React from 'react'

// Reusable component to display user-friendly error messages.
// Accepts: `title` (string), `message` (string), and optional `onRetry` callback.
export default function ErrorMessage({ title = 'Something went wrong', message, onRetry }) {
  // Log the full message to console for debugging (do not show technical details to users)
  console.error('ErrorMessage shown:', { title, message })

  return (
    <div role="alert" className="error-message" aria-live="polite">
      <strong className="error-title">{title}</strong>
      {message && <div className="error-body">{message}</div>}
      {onRetry && (
        <div className="error-actions">
          <button onClick={onRetry} className="btn btn-outline">Retry</button>
        </div>
      )}
    </div>
  )
}