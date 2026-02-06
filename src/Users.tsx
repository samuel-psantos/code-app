import { useState } from 'react'
import type { DragEvent } from 'react'
import './App.css'

type PageKey = 'home' | 'users'

type UsersProps = {
  activePage: PageKey
  onNavigate: (page: PageKey) => void
}

type RoleKey = 'Admin' | 'Editor' | 'Leitor'

type UserCard = {
  id: string
  name: string
  email: string
  role: RoleKey
}

const navItems: Array<{ id: PageKey; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'users', label: 'Usuarios' },
]

const initialColumns: Record<RoleKey, UserCard[]> = {
  Admin: [
    { id: 'u1', name: 'Ana Silva', email: 'ana.silva@empresa.com', role: 'Admin' },
    { id: 'u2', name: 'Marcos Lima', email: 'marcos@empresa.com', role: 'Admin' },
  ],
  Editor: [
    { id: 'u3', name: 'Bruno Lopes', email: 'bruno@empresa.com', role: 'Editor' },
    { id: 'u4', name: 'Clara Dias', email: 'clara@empresa.com', role: 'Editor' },
  ],
  Leitor: [
    { id: 'u5', name: 'Carla Costa', email: 'carla@empresa.com', role: 'Leitor' },
    { id: 'u6', name: 'Diego Alves', email: 'diego@empresa.com', role: 'Leitor' },
  ],
}

const roles: RoleKey[] = ['Admin', 'Editor', 'Leitor']

function Users({ activePage, onNavigate }: UsersProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [columns, setColumns] = useState(initialColumns)

  const handleDragStart = (event: DragEvent<HTMLDivElement>, userId: string, role: RoleKey) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ userId, role }))
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetRole: RoleKey) => {
    event.preventDefault()
    const data = event.dataTransfer.getData('text/plain')
    if (!data) return

    const { userId, role } = JSON.parse(data) as { userId: string; role: RoleKey }
    if (role === targetRole) return

    setColumns((prev) => {
      const sourceUsers = prev[role]
      const movedUser = sourceUsers.find((user) => user.id === userId)
      if (!movedUser) return prev

      return {
        ...prev,
        [role]: sourceUsers.filter((user) => user.id !== userId),
        [targetRole]: [...prev[targetRole], { ...movedUser, role: targetRole }],
      }
    })
  }

  return (
    <div className={`app ${isCollapsed ? 'is-collapsed' : ''}`}>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="brand">
          <div className="brand-mark">UF</div>
          <div className="brand-text">
            <span>UserFlow</span>
            <small>Gerenciamento</small>
          </div>
          <button
            className="sidebar-toggle"
            type="button"
            onClick={() => setIsCollapsed((value) => !value)}
            aria-label={isCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
          >
            {isCollapsed ? '>>' : '<<'}
          </button>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <span className="nav-dot" />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <h4>Resumo</h4>
          <p>Arraste os usuarios entre as roles para atualizar os acessos.</p>
          <button className="ghost" type="button">
            Exportar
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Usuarios</p>
            <h1>Organize perfis e acessos</h1>
          </div>
          <div className="top-actions">
            <div className="search">
              <input placeholder="Buscar usuarios" aria-label="Buscar usuarios" />
              <span className="search-hint">Ctrl + K</span>
            </div>
            <button className="primary" type="button">
              Novo usuario
            </button>
          </div>
        </header>

        <section className="kanban">
          {roles.map((role) => (
            <div
              key={role}
              className="kanban-column"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, role)}
            >
              <div className="kanban-header">
                <div>
                  <h3>{role}</h3>
                  <span>{columns[role].length} usuarios</span>
                </div>
                <span className="kanban-pill">Role</span>
              </div>
              <div className="kanban-body">
                {columns[role].length === 0 ? (
                  <div className="kanban-empty">Solte usuarios aqui</div>
                ) : (
                  columns[role].map((user) => (
                    <div
                      key={user.id}
                      className="user-card"
                      draggable
                      onDragStart={(event) => handleDragStart(event, user.id, role)}
                    >
                      <div>
                        <strong>{user.name}</strong>
                        <p>{user.email}</p>
                      </div>
                      <span className="user-role">{user.role}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default Users
