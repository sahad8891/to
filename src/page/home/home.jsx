import { useEffect, useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'

function Home() {
    // Example of fetching data with loading and error handling.
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                // Example API call; wrap in try/catch to handle network errors
                const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
                // Handle HTTP errors (4xx/5xx)
                if (!res.ok) {
                    const text = await res.text()
                    throw new Error(`Server error: ${res.status} ${text}`)
                }
                const json = await res.json()
                if (isMounted) setData(json)
            } catch (err) {
                // Log for debugging and set a user-friendly message
                console.error('Failed to load TODO item:', err)
                if (isMounted) setError('Unable to load content. Please check your connection and try again.')
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <p className="muted">Example data fetch with error handling and loading state.</p>

            {loading && <div style={{padding:24}}><div className="spinner" aria-hidden="true"></div></div>}

            {error && <ErrorMessage title="Load error" message={error} onRetry={() => window.location.reload()} />}

            {data && (
                <div style={{marginTop:12}} className="card">
                    <h3 className="card-title">Fetched item</h3>
                    <div className="card-body">
                      <div><strong>ID:</strong> {data.id}</div>
                      <div><strong>Title:</strong> {data.title}</div>
                      <div><strong>Completed:</strong> {String(data.completed)}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home