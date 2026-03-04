import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useTheme } from '../ThemeContext'

const allModels = [
  { id: 1, name: 'MediScan AI', category: 'Healthcare', type: 'Software', price: 24999, builder: 'NovaTech', rating: 4.8, tags: ['AI', 'Diagnostics'], desc: 'AI-powered medical image analysis prototype for early disease detection.' },
  { id: 2, name: 'AgroBot v2', category: 'Agriculture', type: 'Hardware', price: 41999, builder: 'GreenCore', rating: 4.6, tags: ['Robot', 'IoT'], desc: 'Autonomous farming robot with soil analysis and precision irrigation.' },
  { id: 3, name: 'EduFlow LMS', category: 'Education', type: 'Software', price: 16999, builder: 'LearnLab', rating: 4.9, tags: ['Learning', 'SaaS'], desc: 'Modular learning management system with real-time progress tracking.' },
  { id: 4, name: 'PowerGrid Monitor', category: 'Energy', type: 'Hardware', price: 54999, builder: 'VoltSys', rating: 4.7, tags: ['IoT', 'Monitor'], desc: 'Smart grid monitoring device with live analytics and fault detection.' },
  { id: 5, name: 'FinTrack Pro', category: 'Finance', type: 'Software', price: 19999, builder: 'CapitalX', rating: 4.5, tags: ['Fintech', 'Analytics'], desc: 'Personal finance tracker with AI-based spending insights.' },
  { id: 6, name: 'SecureCam 360', category: 'Defense', type: 'Hardware', price: 34999, builder: 'ShieldTech', rating: 4.4, tags: ['Security', 'IoT'], desc: 'AI-enabled 360° surveillance camera with motion intelligence.' },
  { id: 7, name: 'CropSense IoT', category: 'Agriculture', type: 'Hardware', price: 28999, builder: 'GreenCore', rating: 4.3, tags: ['IoT', 'Sensors'], desc: 'Soil moisture and nutrient sensor array for smart farming.' },
  { id: 8, name: 'MedAlert Wearable', category: 'Healthcare', type: 'Hardware', price: 12999, builder: 'PulseWorks', rating: 4.6, tags: ['Wearable', 'Health'], desc: 'Real-time vitals monitoring wearable with emergency alert system.' },
  { id: 9, name: 'ClassBot AI', category: 'Education', type: 'Software', price: 9999, builder: 'LearnLab', rating: 4.7, tags: ['AI', 'Tutor'], desc: 'AI tutoring assistant that adapts to student learning pace.' },
  { id: 10, name: 'SolarSync', category: 'Energy', type: 'Hardware', price: 39999, builder: 'VoltSys', rating: 4.8, tags: ['Solar', 'IoT'], desc: 'Solar panel efficiency optimizer with predictive maintenance alerts.' },
  { id: 11, name: 'TradePilot', category: 'Finance', type: 'Software', price: 29999, builder: 'CapitalX', rating: 4.6, tags: ['Trading', 'AI'], desc: 'Algorithmic trading prototype with backtesting and live signals.' },
  { id: 12, name: 'DronePatrol', category: 'Defense', type: 'Hardware', price: 89999, builder: 'ShieldTech', rating: 4.9, tags: ['Drone', 'AI'], desc: 'Autonomous patrol drone with obstacle avoidance and live feed.' },
]

const sectors = ['All', 'Healthcare', 'Agriculture', 'Education', 'Finance', 'Defense', 'Energy']
const types = ['All', 'Software', 'Hardware']

export default function Marketplace() {
  const { dark } = useTheme()
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('All')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('default')

  const filtered = allModels
    .filter(m => sector === 'All' || m.category === sector)
    .filter(m => type === 'All' || m.type === type)
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.builder.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price
      if (sort === 'price-high') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  const bg = dark ? '#0a0a0a' : '#f8f8f8'
  const cardBg = dark ? '#111' : '#fff'
  const border = dark ? '#222' : '#eee'
  const text = dark ? '#f0f0f0' : '#111'
  const subtext = dark ? '#888' : '#555'

  return (
    <div style={{ background: bg, minHeight: '100vh', transition: 'background 0.3s ease', color: text }}>
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f, #1a1040)', padding: '3.5rem 2rem 3rem', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Prototype Marketplace</h1>
        <p style={{ color: '#aaa', fontSize: '1rem' }}>Browse and buy real working prototypes from verified builders</p>
        <div style={{ maxWidth: '520px', margin: '2rem auto 0', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search prototypes, builders, sectors..."
            style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: '12px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          {search && <X size={16} onClick={() => setSearch('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888', cursor: 'pointer' }} />}
        </div>
      </div>

      <div style={{ background: cardBg, borderBottom: `1px solid ${border}`, padding: '1rem 2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.3s ease' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <SlidersHorizontal size={16} color="#888" />
          <span style={{ fontSize: '0.85rem', color: '#888', marginRight: '0.5rem' }}>Sector:</span>
          {sectors.map(s => (
            <button key={s} onClick={() => setSector(s)} style={{
              padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
              background: sector === s ? '#6c63ff' : dark ? '#1a1a1a' : '#f5f5f5',
              color: sector === s ? '#fff' : dark ? '#aaa' : '#555',
              border: sector === s ? '1px solid #6c63ff' : `1px solid ${border}`
            }}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Type:</span>
          {types.map(t => (
            <button key={t} onClick={() => setType(t)} style={{
              padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
              background: type === t ? '#111' : dark ? '#1a1a1a' : '#f5f5f5',
              color: type === t ? '#fff' : dark ? '#aaa' : '#555',
              border: type === t ? '1px solid #555' : `1px solid ${border}`
            }}>{t}</button>
          ))}
          <select value={sort} onChange={e => setSort(e.target.value)} style={{
            padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600',
            cursor: 'pointer', border: `1px solid ${border}`, background: dark ? '#1a1a1a' : '#f5f5f5',
            color: dark ? '#aaa' : '#555', outline: 'none', marginLeft: '0.5rem'
          }}>
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Showing <strong style={{ color: text }}>{filtered.length}</strong> prototypes
          {sector !== 'All' && ` in ${sector}`}{type !== 'All' && ` · ${type} only`}
        </p>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: subtext }}>No prototypes found</div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Try adjusting your filters or search term</div>
          </div>
        ) : (
          <div className="grid-4">
            {filtered.map((item, i) => (
              <Link to={`/model/${item.id}`} key={item.id} className="card" style={{ padding: '1.5rem', animationDelay: `${i * 0.05}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                  <span className={`tag ${item.type === 'Hardware' ? 'tag-green' : ''}`}>{item.type}</span>
                  <span style={{ color: '#f59e0b', fontSize: '0.82rem', fontWeight: '600' }}>★ {item.rating}</span>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.8rem' }}>by {item.builder} · {item.category}</div>
                <div style={{ fontSize: '0.85rem', color: subtext, lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ background: dark ? '#222' : '#f5f5f5', color: dark ? '#aaa' : '#555', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '500' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#6c63ff' }}>₹{item.price.toLocaleString('en-IN')}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}