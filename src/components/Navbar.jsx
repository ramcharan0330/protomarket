import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Cpu, LogOut } from 'lucide-react'
import { useAuth } from '../AuthContext'
import { useTheme } from '../ThemeContext'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, userRole, logout } = useAuth()
  const { dark, toggle } = useTheme()

  const links = [
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/trending', label: 'Trending' },
    { to: '/custom-orders', label: 'Custom Orders' },
    ...(userRole === 'builder' ? [{ to: '/dashboard', label: '⚡ Dashboard' }] : []),
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav style={{
      background: '#0f0f0f', borderBottom: '1px solid #1a1a1a',
      padding: '0 2.5rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: '64px',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Cpu color="#6c63ff" size={26} />
        <span style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800' }}>
          Proto<span style={{ color: '#6c63ff' }}>Market</span>
        </span>
        <span style={{
          background: '#6c63ff22', color: '#6c63ff', fontSize: '0.65rem',
          fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '6px',
          marginLeft: '0.3rem', letterSpacing: '1px'
        }}>BETA</span>
      </Link>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {links.map(link => (
          <Link key={link.to} to={link.to} style={{
            color: location.pathname === link.to ? '#fff' : '#888',
            padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500',
            background: location.pathname === link.to ? '#1a1a1a' : 'transparent',
            transition: 'color 0.2s ease, background 0.2s ease'
          }}
            onMouseEnter={e => { if (location.pathname !== link.to) e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { if (location.pathname !== link.to) e.currentTarget.style.color = '#888' }}
          >
            {link.label}
          </Link>
        ))}

        {/* Dark mode toggle */}
        <button onClick={toggle} style={{
          background: dark ? '#1a1a1a' : '#2a2a2a',
          border: '1px solid #333',
          borderRadius: '20px',
          padding: '0.4rem 0.9rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.82rem',
          fontWeight: '600',
          color: '#fff',
          transition: 'all 0.2s',
        }}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginLeft: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={user.photoURL} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #6c63ff' }} />
              <div>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '600' }}>{user.displayName?.split(' ')[0]}</div>
                <div style={{ color: '#6c63ff', fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase' }}>{userRole}</div>
              </div>
            </div>
            <button onClick={handleLogout} style={{
              background: 'transparent', border: '1px solid #333', color: '#888',
              padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem',
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e11d48'; e.currentTarget.style.color = '#e11d48' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888' }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ marginLeft: '0.3rem', padding: '0.5rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem' }}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}