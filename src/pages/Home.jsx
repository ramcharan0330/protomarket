import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Zap, Shield, TrendingUp } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'

const categories = [
  { name: 'Healthcare', icon: '🏥', desc: 'Diagnostics, monitoring & more' },
  { name: 'Agriculture', icon: '🌾', desc: 'Smart farming solutions' },
  { name: 'Education', icon: '📚', desc: 'EdTech tools & platforms' },
  { name: 'Finance', icon: '💹', desc: 'Fintech & trading tools' },
  { name: 'Defense', icon: '🛡️', desc: 'Surveillance & security' },
  { name: 'Energy', icon: '⚡', desc: 'Grid & renewable tech' },
]

const featured = [
  { id: 1, name: 'MediScan AI', category: 'Healthcare', type: 'Software', price: 24999, builder: 'NovaTech', rating: 4.8, tags: ['AI', 'Diagnostics'] },
  { id: 2, name: 'AgroBot v2', category: 'Agriculture', type: 'Hardware', price: 41999, builder: 'GreenCore', rating: 4.6, tags: ['Robot', 'IoT'] },
  { id: 3, name: 'EduFlow LMS', category: 'Education', type: 'Software', price: 16999, builder: 'LearnLab', rating: 4.9, tags: ['Learning', 'SaaS'] },
  { id: 4, name: 'PowerGrid Monitor', category: 'Energy', type: 'Hardware', price: 54999, builder: 'VoltSys', rating: 4.7, tags: ['IoT', 'Monitor'] },
]

export default function Home() {
  const { dark } = useTheme()
  const heroRef = useRef(null)

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.fade-up')
    els?.forEach((el, i) => {
      el.style.opacity = 0
      el.style.animationDelay = `${i * 0.15}s`
      el.style.animationFillMode = 'forwards'
    })
  }, [])

  return (
<div style={{ background: dark ? '#0a0a0a' : '#f8f8f8', minHeight: '100vh', transition: 'background 0.3s ease' }}>
      <section ref={heroRef} style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1040 50%, #0f0f0f 100%)',
        padding: '7rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, #6c63ff22 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: '#ffffff11', border: '1px solid #6c63ff44',
          borderRadius: '20px', padding: '0.4rem 1rem',
          fontSize: '0.85rem', color: '#a89dff', marginBottom: '2rem'
        }}>
          <span style={{ animation: 'pulse 2s infinite', display: 'inline-block' }}>🚀</span>
          Now in Beta — India's Prototype Marketplace
        </div>

        <h1 className="fade-up" style={{
          fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: '800',
          color: '#fff', lineHeight: 1.15, marginBottom: '1.5rem', maxWidth: '750px', margin: '0 auto 1.5rem'
        }}>
          Buy, Configure & Commission<br />
          <span style={{ color: '#6c63ff' }}>Real Working Prototypes</span>
        </h1>

        <p className="fade-up" style={{
          color: '#aaa', fontSize: '1.05rem', maxWidth: '520px',
          margin: '0 auto 2.5rem', lineHeight: 1.8
        }}>
          A marketplace where engineers list software and hardware prototypes — ready to buy, configure, or get built custom for you.
        </p>

        <div className="fade-up" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/marketplace" className="btn-primary">
            Explore Marketplace <ArrowRight size={16} />
          </Link>
          <Link to="/custom-orders" className="btn-secondary" style={{ color: '#ccc', borderColor: '#444' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6c63ff'; e.currentTarget.style.borderColor = '#6c63ff' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#ccc'; e.currentTarget.style.borderColor = '#444' }}
          >
            Request Custom Build
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2 className="section-title fade-up">Browse by Sector</h2>
        <p className="section-sub fade-up">Find prototypes built for your industry</p>
        <div className="grid-3">
          {categories.map((cat, i) => (
            <Link to="/marketplace" key={cat.name} className="card" style={{
              padding: '1.8rem', animationDelay: `${i * 0.1}s`
            }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>{cat.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem' }}>{cat.name}</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>{cat.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section style={{ background: dark ? '#111' : '#fff', padding: '5rem 0', transition: 'background 0.3s ease' }}>
        <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2 className="section-title">Featured Prototypes</h2>
          <p className="section-sub">Handpicked listings from our early builders</p>
          <div className="grid-4">
            {featured.map((item, i) => (
              <Link to={`/model/${item.id}`} key={item.id} className="card" style={{
                padding: '1.5rem', animationDelay: `${i * 0.1}s`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                  <span className={`tag ${item.type === 'Hardware' ? 'tag-green' : ''}`}>{item.type}</span>
                  <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: '600' }}>★ {item.rating}</span>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '0.3rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#888', marginBottom: '1rem' }}>by {item.builder} · {item.category}</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      background: '#f5f5f5', color: '#555',
                      padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '500'
                    }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#6c63ff' }}>
                  ₹{item.price.toLocaleString('en-IN')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why ProtoMarket */}
      <section className="section">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Why ProtoMarket?</h2>
        <p className="section-sub" style={{ textAlign: 'center' }}>Built to solve real problems between builders and buyers</p>
        <div className="grid-4" style={{ marginTop: '1rem' }}>
          {[
            { icon: <Zap color="#6c63ff" size={26} />, title: 'Ready to Use', desc: 'Browse tested prototypes you can configure and deploy immediately.' },
            { icon: <Shield color="#6c63ff" size={26} />, title: 'Secure Payments', desc: 'Pay into escrow first. Funds release only when you are satisfied.' },
            { icon: <TrendingUp color="#6c63ff" size={26} />, title: 'Live Trends', desc: 'See which sectors are growing and which builders are leading.' },
            { icon: <Cpu color="#6c63ff" size={26} />, title: 'Both Worlds', desc: 'Hardware and software prototypes together in one place.' },
          ].map(item => (
            <div key={item.title} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{item.title}</div>
              <div style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #0f0f0f, #1a1040)',
        padding: '5rem 2rem', textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>
          Ready to explore?
        </h2>
        <p style={{ color: '#aaa', marginBottom: '2rem', fontSize: '1rem' }}>
          Browse prototypes or list your own build on ProtoMarket.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/marketplace" className="btn-primary">Browse Marketplace</Link>
          <Link to="/custom-orders" className="btn-secondary" style={{ color: '#ccc', borderColor: '#444' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6c63ff'; e.currentTarget.style.borderColor = '#6c63ff' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#ccc'; e.currentTarget.style.borderColor = '#444' }}
          >
            Post a Custom Request
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}