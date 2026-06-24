import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

function Layout() {
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <main className="ui-container" style={{paddingTop:20, paddingBottom:40}}>
                <div className="ui-grid">
                    <section className="card" style={{gridColumn: '1 / -1'}}>
                        <Outlet />
                    </section>
                </div>
            </main>

            <footer className="ui-container" style={{padding:20, borderTop: '1px solid var(--border)'}}>
                <p className="muted">© 2023 My App. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Layout