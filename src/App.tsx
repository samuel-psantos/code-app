import { useState } from 'react'
import Home from './Home'
import Users from './Users'

type PageKey = 'home' | 'users'

function App() {
  const [activePage, setActivePage] = useState<PageKey>('home')

  if (activePage === 'users') {
    return <Users activePage={activePage} onNavigate={setActivePage} />
  }

  return <Home activePage={activePage} onNavigate={setActivePage} />
}

export default App
