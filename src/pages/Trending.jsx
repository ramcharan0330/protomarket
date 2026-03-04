import { Link } from 'react-router-dom'
import { TrendingUp, Award, Zap, ArrowUp } from 'lucide-react'
import { useTheme } from '../ThemeContext'

const topBuilders = [
  { id: 3, rank: 1, name: 'LearnLab', founder: 'Rohan Das', avatar: '👨‍🏫', rating: 4.9, totalSales: 54, growth: '+34%', sector: 'EdTech', verified: true },
  { id: 1, rank: 2, name: 'NovaTech', founder: 'Arjun Mehta', avatar: '🧑‍💻', rating: 4.8, totalSales: 38, growth: '+28%', sector: 'Healthcare', verified: true },
  { id: 4, rank: 3, name: 'VoltSys', founder: 'Kavya Reddy', avatar: '👩‍🔧', rating: 4.7, totalSales: 31, growth: '+21%', sector: 'Energy', verified: true },
  { id: 2, rank: 4, name: 'GreenCore', founder: 'Priya Nair', avatar: '👩‍🔬', rating: 4.6, totalSales: 27, growth: '+18%', sector: 'Agriculture', verified: true },
  { id: 7, rank: 5, name: 'PulseWorks', founder: 'Sneha Iyer', avatar: '👩‍⚕️', rating: 4.6, totalSales: 19, growth: '+15%', sector: 'Healthcare', verified: true },
]

const trendingSectors = [
  { name: 'Healthcare', icon: '🏥', growth: '+42%', models: 8, desc: 'AI diagnostics and wearables are seeing massive demand', hot: true },
  { name: 'Education', icon: '📚', growth: '+38%', models: 6, desc: 'EdTech prototypes booming post-pandemic', hot: true },
  { name: 'Energy', icon: '⚡', growth: '+29%', models: 5, desc: 'Solar and smart grid solutions rising fast', hot: true },
  { name: 'Agriculture', icon: '🌾', growth: '+24%', models: 5, desc: 'IoT farming tools gaining traction in rural markets', hot: false },
  { name: 'Finance', icon: '💹', growth: '+19%', models: 4, desc: 'Fintech and algo trading tools growing steadily', hot: false },
  { name: 'Defense', icon: '🛡️', growth: '+12%', models: 3, desc: 'Drone and surveillance prototypes picking up', hot: false },
]

const recentActivity = [
  { action: 'purchased', model: 'MediScan AI', user: 'A buyer from Mumbai', time: '2 mins ago', icon: '💳' },
  { action: 'listed', model: 'DronePatrol', user: 'ShieldTech', time: '18 mins ago', icon: '📦' },
  { action: 'purchased', model: 'EduFlow LMS', user: 'A buyer from Delhi', time: '34 mins ago', icon: '💳' },
  { action: 'purchased', model: 'SolarSync', user: 'A buyer from Jaipur', time: '1 hr ago', icon: '💳' },
  { action: 'listed', model: 'ClassBot AI', user: 'LearnLab', time: '2 hrs ago', icon: '📦' },
  { action: 'purchased', model: 'AgroBot v2', user: 'A buyer from Nagpur', time: '3 hrs ago', icon: '💳' },
]

const rankLabels = ['🥇', '🥈', '🥉']

export default function Trending() {
  const { dark } = useTheme()
  const bg = dark ? '#0a0a0a' : '#f8f8f8'
  const cardBg = dark ? '#111' : '#fff'
  const border = dark ? '#222' : '#eee'
  const text = dark ? '#f0f0f0' : '#111'

  return (
    <div style={{ background: bg, minHeight: '100vh', transition: 'background 0.3s ease', color: text }}>
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f, #1a1040)', padding: '3.5rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff11', border: '1px solid #6c63ff44', borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '0.85rem', color: '#a89dff', marginBottom: '1.5rem' }}>
          <TrendingUp size={14} /> Live Trending Data
        </div>
        <h1 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>What's Trending on ProtoMarket</h1>
        <p style={{ color: '#aaa', fontSize: '1rem' }}>Top builders, rising sectors and live marketplace activity</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Award size={20} color="#6c63ff" />
            <h2 className="section-title" style={{ marginBottom: 0, color: text }}>Top Builders This Month</h2>
          </div>
          <p className="section-sub">Ranked by sales, rating and growth</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {topBuilders.map((builder, i) => (
              <Link to={`/builder/${builder.id}`} key={builder.id} className="card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '1.5rem', minWidth: '36px', textAlign: 'center' }}>
                  {i < 3 ? rankLabels[i] : <span style={{ fontWeight: '800', color: '#aaa', fontSize: '1rem' }}>#{builder.rank}</span>}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: dark ? '#2a2040' : '#f0efff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  {builder.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '1rem' }}>{builder.name}</span>
                    {builder.verified && <span style={{ fontSize: '0.7rem', background: '#edfdf5', color: '#065f46', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: '600' }}>✓ Verified</span>}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#888' }}>by {builder.founder} · {builder.sector}</div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '700', color: '#f59e0b', fontSize: '0.95rem' }}>★ {builder.rating}</div>
                    <div style={{ fontSize: '0.72rem', color: '#aaa' }}>Rating</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{builder.totalSales}</div>
                    <div style={{ fontSize: '0.72rem', color: '#aaa' }}>Sales</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#edfdf5', color: '#16a34a', padding: '0.3rem 0.7rem', borderRadius: '8px', fontWeight: '700', fontSize: '0.88rem' }}>
                    <ArrowUp size={13} /> {builder.growth}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Zap size={20} color="#6c63ff" />
            <h2 className="section-title" style={{ marginBottom: 0, color: text }}>Rising Sectors</h2>
          </div>
          <p className="section-sub">Sectors with the most growth in purchases this month</p>
          <div className="grid-3">
            {trendingSectors.map(sector => (
              <Link to="/marketplace" key={sector.name} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>{sector.icon}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#edfdf5', color: '#16a34a', padding: '0.25rem 0.6rem', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem' }}>
                      <ArrowUp size={12} /> {sector.growth}
                    </div>
                    {sector.hot && <span style={{ background: '#fff1f2', color: '#e11d48', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>🔥 HOT</span>}
                  </div>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem' }}>{sector.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#888', marginBottom: '0.8rem', lineHeight: 1.5 }}>{sector.desc}</div>
                <div style={{ fontSize: '0.8rem', color: '#6c63ff', fontWeight: '600' }}>{sector.models} active models</div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }} />
            <h2 className="section-title" style={{ marginBottom: 0, color: text }}>Live Activity</h2>
          </div>
          <p className="section-sub">Recent purchases and listings on ProtoMarket</p>
          <div className="card" style={{ padding: '0.5rem' }}>
            {recentActivity.map((activity, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.2rem', borderBottom: i < recentActivity.length - 1 ? `1px solid ${border}` : 'none' }}>
                <span style={{ fontSize: '1.2rem' }}>{activity.icon}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{activity.user} </span>
                  <span style={{ color: '#888', fontSize: '0.88rem' }}>{activity.action} </span>
                  <span style={{ fontWeight: '600', color: '#6c63ff', fontSize: '0.9rem' }}>{activity.model}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#bbb', whiteSpace: 'nowrap' }}>{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}