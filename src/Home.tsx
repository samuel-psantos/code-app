import { useState } from 'react'
import './App.css'

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'usuarios', label: 'Usuarios' },
  { id: 'permissoes', label: 'Permissoes' },
]

const recentActivity = [
  { action: 'Convite enviado', detail: 'ana.silva@empresa.com', time: 'Ha 2h' },
  { action: 'Permissao alterada', detail: 'Bruno Lopes -> Admin', time: 'Ha 5h' },
  { action: 'Usuario bloqueado', detail: 'carla@empresa.com', time: 'Ontem' },
]

const teamMembers = [
  { name: 'Ana Silva', role: 'Admin', status: 'Ativo' },
  { name: 'Bruno Lopes', role: 'Editor', status: 'Ativo' },
  { name: 'Carla Costa', role: 'Leitor', status: 'Bloqueado' },
]

function Home() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [isCollapsed, setIsCollapsed] = useState(false)

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
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
              type="button"
            >
              <span className="nav-dot" />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <h4>Proximo passo</h4>
          <p>Convide a equipe e defina perfis para novos usuarios.</p>
          <button className="ghost" type="button">
            Convidar
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Painel geral</p>
            <h1>Controle de usuarios</h1>
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

        <section className="stats">
          <div className="stat-card">
            <p>Usuarios ativos</p>
            <h2>1.284</h2>
            <span className="trend up">+12% este mes</span>
          </div>
          <div className="stat-card">
            <p>Convites pendentes</p>
            <h2>37</h2>
            <span className="trend warn">Aguardando resposta</span>
          </div>
          <div className="stat-card">
            <p>Bloqueados</p>
            <h2>8</h2>
            <span className="trend down">-2 desde ontem</span>
          </div>
        </section>

        <section className="content">
          <div className="panel">
            <div className="panel-header">
              <h3>Atividade recente</h3>
              <button className="ghost" type="button">
                Ver tudo
              </button>
            </div>
            <div className="panel-body">
              {recentActivity.map((item) => (
                <div key={item.detail} className="activity-item">
                  <div>
                    <strong>{item.action}</strong>
                    <p>{item.detail}</p>
                  </div>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>Equipe</h3>
              <button className="ghost" type="button">
                Gerenciar
              </button>
            </div>
            <div className="panel-body">
              {teamMembers.map((member) => (
                <div key={member.name} className="member-item">
                  <div>
                    <strong>{member.name}</strong>
                    <p>{member.role}</p>
                  </div>
                  <span className={`status ${member.status === 'Ativo' ? 'ok' : 'block'}`}>
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
