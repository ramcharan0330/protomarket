import { Link } from 'react-router-dom'
import { Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      background: '#0f0f0f',
      borderTop: '1px solid #1a1a1a',
      padding: '3rem 2rem 2rem',
      color: '#666'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <Cpu color="#6c63ff" size={22} />
              <span style={{ color: '#fff', fontWeight: '800', fontSize: '1.1rem' }}>
                Proto<span style={{ color: '#6c63ff' }}>Market</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#555' }}>
              India's prototype marketplace. Buy, configure, and commission real working prototypes.
            </p>
            <div style={{ marginTop: '0.8rem', display: 'inline-block', background: '#6c63ff22', color: '#6c63ff', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '6px', letterSpacing: '1px' }}>
              BETA
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1rem' }}>Marketplace</div>
            {[['/', 'Home'], ['/marketplace', 'Browse Prototypes'], ['/trending', 'Trending'], ['/custom-orders', 'Custom Orders']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: '#555', fontSize: '0.85rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#6c63ff'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >{label}</Link>
            ))}
          </div>

          {/* Sectors */}
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1rem' }}>Sectors</div>
            {['Healthcare', 'Agriculture', 'Education', 'Finance', 'Defense', 'Energy'].map(s => (
              <Link key={s} to="/marketplace" style={{ display: 'block', color: '#555', fontSize: '0.85rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#6c63ff'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >{s}</Link>
            ))}
          </div>

          {/* For Builders */}
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1rem' }}>For Builders</div>
            {['List a Prototype', 'Take Custom Orders', 'Builder Guidelines', 'Pricing & Fees'].map(s => (
              <div key={s} style={{ color: '#555', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: '#444' }}>
            © 2025 ProtoMarket · India's Prototype Marketplace · Currently in Beta
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Contact'].map(item => (
              <span key={item} style={{ color: '#444', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#6c63ff'}
                onMouseLeave={e => e.currentTarget.style.color = '#444'}
              >{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}