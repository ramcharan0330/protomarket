import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { useAuth } from '../AuthContext'
import { Cpu, ShoppingBag, Wrench, ArrowRight } from 'lucide-react'

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUserRole } = useAuth()

  const handleGoogleLogin = async () => {
    if (!selectedRole) return
    setLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      localStorage.setItem(`role_${result.user.uid}`, selectedRole)
      setUserRole(selectedRole)
      navigate('/')
    } catch (err) {
      setError('Login failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1040 50%, #0f0f0f 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
          <Cpu color="#6c63ff" size={28} />
          <span style={{ color: '#fff', fontSize: '1.6rem', fontWeight: '800' }}>
            Proto<span style={{ color: '#6c63ff' }}>Market</span>
          </span>
        </Link>

        <div className="card" style={{ borderRadius: '20px', padding: '2.5rem', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.4rem', textAlign: 'center' }}>
            Join ProtoMarket
          </h2>
          <p style={{ color: '#888', fontSize: '0.9rem', textAlign: 'center', marginBottom: '2rem' }}>
            Tell us who you are to get started
          </p>

          {/* Role Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { role: 'buyer', icon: <ShoppingBag size={28} color={selectedRole === 'buyer' ? '#6c63ff' : '#aaa'} />, title: 'I am a Buyer', desc: 'Browse and purchase prototypes or request custom builds' },
              { role: 'builder', icon: <Wrench size={28} color={selectedRole === 'builder' ? '#6c63ff' : '#aaa'} />, title: 'I am a Builder', desc: 'List your prototypes and take custom orders from buyers' },
            ].map(({ role, icon, title, desc }) => (
              <div key={role} onClick={() => setSelectedRole(role)}
                className={`role-card ${selectedRole === role ? 'selected' : ''}`}
                style={{
                  padding: '1.5rem 1rem', borderRadius: '14px', textAlign: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                  border: selectedRole === role ? '2px solid #6c63ff' : '2px solid #eee',
                }}>
                <div style={{ marginBottom: '0.8rem' }}>{icon}</div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.4rem', color: selectedRole === role ? '#6c63ff' : 'inherit' }}>{title}</div>
                <div style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={!selectedRole || loading}
            style={{
              width: '100%', padding: '0.9rem', borderRadius: '12px',
              border: '1.5px solid #ddd', background: selectedRole ? '#fff' : '#f5f5f5',
              cursor: selectedRole ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
              fontWeight: '600', fontSize: '0.95rem', color: selectedRole ? '#111' : '#aaa',
              transition: 'all 0.2s', marginBottom: '1rem'
            }}
            onMouseEnter={e => { if (selectedRole) e.currentTarget.style.borderColor = '#6c63ff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd' }}
          >
            {loading ? '⏳ Signing in...' : (
              <>
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z" />
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.6 5.1C9.8 39.8 16.4 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.8l6.2 5.2C40.9 35.7 44 30.3 44 24c0-1.3-.1-2.7-.4-4z" />
                </svg>
                Continue with Google <ArrowRight size={16} />
              </>
            )}
          </button>

          {error && (
            <div style={{ background: '#fff1f2', color: '#e11d48', padding: '0.8rem', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', lineHeight: 1.6 }}>
            By continuing you agree to ProtoMarket's Terms of Use and Privacy Policy.
            Your role can be changed later from your profile settings.
          </p>
        </div>
      </div>
    </div>
  )
}