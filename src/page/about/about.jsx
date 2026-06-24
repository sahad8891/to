import { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'

function About() {
    // Simple contact form with client-side validation and async submit handling.
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const validate = () => {
        if (!name.trim()) return 'Name is required.'
        // basic email regex; in production use a more robust validator
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return 'Please enter a valid email address.'
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        setSubmitting(true)
        try {
            // Simulate an async API call; always wrap network calls in try/catch
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(`Server responded with ${res.status}: ${text}`)
            }

            const result = await res.json()
            console.log('Form submit success:', result)
            setSuccess('Your message was sent successfully.')
            setName('')
            setEmail('')
        } catch (err) {
            // Distinguish between network errors and other errors if needed
            console.error('Form submission failed:', err)
            setError('Failed to send message. Please try again later.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <h1>Contact</h1>
            <p className="muted">Fill out the form; client-side validation and friendly errors are shown.</p>

            <form onSubmit={handleSubmit} noValidate className="form" style={{maxWidth:400}}>
                <div className="form-field">
                    <label className="form-label">Name</label>
                    <input className={`form-input ${error && !name ? 'is-invalid' : ''}`} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!name} />
                </div>

                <div className="form-field">
                    <label className="form-label">Email</label>
                    <input className={`form-input ${error && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))} />
                </div>

                {error && <ErrorMessage title="Form error" message={error} />}
                {success && <div className="form-success">{success}</div>}

                <div>
                  <button type="submit" disabled={submitting} className="btn btn-primary">
                      {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
            </form>
        </div>
    )
}

export default About