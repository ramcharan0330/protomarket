import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Package, Wrench, CheckCircle } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import Footer from '../components/Footer'

const builders = [
  { id: 1, name: 'NovaTech', founder: 'Arjun Mehta', location: 'Bengaluru, Karnataka', avatar: '🧑‍💻', rating: 4.8, totalSales: 38, joinedYear: 2023, bio: 'We build AI-powered software prototypes focused on healthcare and diagnostics. All our models are production-tested and come with full documentation.', specializations: ['AI/ML', 'Healthcare Tech', 'Computer Vision'], verified: true, models: [{ id: 1, name: 'MediScan AI', type: 'Software', price: 24999, rating: 4.8 }] },
  { id: 2, name: 'GreenCore', founder: 'Priya Nair', location: 'Pune, Maharashtra', avatar: '👩‍🔬', rating: 4.6, totalSales: 27, joinedYear: 2023, bio: 'Hardware engineers specializing in agricultural IoT. We design rugged, field-ready prototypes for Indian farming conditions.', specializations: ['IoT', 'Agriculture', 'Embedded Systems'], verified: true, models: [{ id: 2, name: 'AgroBot v2', type: 'Hardware', price: 41999, rating: 4.6 }, { id: 7, name: 'CropSense IoT', type: 'Hardware', price: 28999, rating: 4.3 }] },
  { id: 3, name: 'LearnLab', founder: 'Rohan Das', location: 'Hyderabad, Telangana', avatar: '👨‍🏫', rating: 4.9, totalSales: 54, joinedYear: 2022, bio: 'EdTech builders creating software tools for schools and coaching institutes across India. Our products are simple, scalable and affordable.', specializations: ['EdTech', 'SaaS', 'AI Tutoring'], verified: true, models: [{ id: 3, name: 'EduFlow LMS', type: 'Software', price: 16999, rating: 4.9 }, { id: 9, name: 'ClassBot AI', type: 'Software', price: 9999, rating: 4.7 }] },
  { id: 4, name: 'VoltSys', founder: 'Kavya Reddy', location: 'Chennai, Tamil Nadu', avatar: '👩‍🔧', rating: 4.7, totalSales: 31, joinedYear: 2023, bio: 'Energy tech hardware builders. We focus on smart grid, solar, and power monitoring solutions for residential and industrial use.', specializations: ['Energy Tech', 'IoT', 'Hardware'], verified: true, models: [{ id: 4, name: 'PowerGrid Monitor', type: 'Hardware', price: 54999, rating: 4.7 }, { id: 10, name: 'SolarSync', type: 'Hardware', price: 39999, rating: 4.8 }] },
  { id: 5, name: 'CapitalX', founder: 'Nikhil Sharma', location: 'Mumbai, Maharashtra', avatar: '👨‍💼', rating: 4.5, totalSales: 22, joinedYear: 2024, bio: 'Fintech prototype builders with deep expertise in trading systems and personal finance tools. All models comply with SEBI guidelines.', specializations: ['Fintech', 'Algo Trading', 'Analytics'], verified: false, models: [{ id: 5, name: 'FinTrack Pro', type: 'Software', price: 19999, rating: 4.5 }, { id: 11, name: 'TradePilot', type: 'Software', price: 29999, rating: 4.6 }] },
  { id: 6, name: 'ShieldTech', founder: 'Amit Verma', location: 'Delhi, NCR', avatar: '🧑‍✈️', rating: 4.4, totalSales: 15, joinedYear: 2024, bio: 'Defense and security hardware prototypes. We build surveillance, drone, and perimeter security solutions for commercial and institutional clients.', specializations: ['Defense Tech', 'Drones', 'Computer Vision'], verified: false, models: [{ id: 6, name: 'SecureCam 360', type: 'Hardware', price: 34999, rating: 4.4 }, { id: 12, name: 'DronePatrol', type: 'Hardware', price: 89999, rating: 4.9 }] },
  { id: 7, name: 'PulseWorks', founder: 'Sneha Iyer', location: 'Coimbatore, Tamil Nadu', avatar: '👩‍⚕️', rating: 4.6, totalSales: 19, joinedYear: 2023, bio: 'Healthcare wearable builders focused on elderly care and hospital monitoring. Our devices are CE-tested and clinically validated.', specializations: ['Wearables', 'Healthcare', 'Embedded Systems'], verified: true, models: [{ id: 8, name: 'MedAlert Wearable', type: 'Hardware', price: 12999, rating: 4.6 }] },
]

export default function BuilderProfile() {
  const { id } = useParams()
  const { dark } = useTheme()
  const bg = dark ? '#0a0a0a' : '#f8f8f8'
  const cardBg = dark ? '#111' : '#fff'
  const border = dark ? '#222' : '#eee'
  const text = dark ? '#f0f0f0' : '#111'
  const subtext = dark ? '#aaa' : '#555'

  const builder = builders.find(b => b.id === parseInt(id))

  if (!builder) return (
    <div style={{ textAlign: 'center', padding: '5rem', background: bg, minHeight: '100vh', color: text }}>
      <div style={{ fontSize: '3rem' }}>🔍</div>
      <div style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1rem' }}>Builder not found</div>
      <Link to="/marketplace" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Back to Marketplace</Link>
    </div>
  )

  const unlockFee = builder.rating >= 4.8 ? 999 : builder.rating >= 4.5 ? 699 : 499

  return (
    <div style={{ background: bg, minHeight: '100vh', transition: 'background 0.3s ease', color: text }}>

      {/* Back */}
      <div style={{ background: cardBg, borderBottom: `1px solid ${border}`, padding: '1rem 2rem', transition: 'background 0.3s ease' }}>
        <Link to="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.9rem', fontWeight: '500' }}
          onMouseEnter={e => e.currentTarget.style.color = '#6c63ff'}
          onMouseLeave={e => e.currentTarget.style.color = '#888'}
        >
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* Profile Card */}
        <div className="card" style={{ padding: '2.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: dark ? '#2a2040' : '#f0efff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0 }}>
              {builder.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{builder.name}</h1>
                {builder.verified && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#edfdf5', color: '#065f46', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600' }}>
                    <CheckCircle size={13} /> Verified Builder
                  </span>
                )}
              </div>
              <div style={{ color: '#888', fontSize: '0.88rem', marginBottom: '0.8rem' }}>
                Founded by {builder.founder} · {builder.location} · Member since {builder.joinedYear}
              </div>
              <p style={{ color: subtext, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>{builder.bio}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {builder.specializations.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '130px' }}>
              {[['★ ' + builder.rating, 'Rating'], [builder.totalSales + '+', 'Sales'], ['₹' + unlockFee, 'Unlock Fee']].map(([val, label]) => (
                <div key={label} style={{ textAlign: 'center', background: dark ? '#222' : '#f9f9f9', borderRadius: '10px', padding: '0.8rem 1rem' }}>
                  <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#6c63ff' }}>{val}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.2rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Listings */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: text }}>
          <Package size={18} style={{ verticalAlign: 'middle', marginRight: '0.4rem', color: '#6c63ff' }} />
          Listed Prototypes
        </h2>
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {builder.models.map(model => (
            <Link to={`/model/${model.id}`} key={model.id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span className={`tag ${model.type === 'Hardware' ? 'tag-green' : ''}`}>{model.type}</span>
                <span style={{ color: '#f59e0b', fontSize: '0.82rem', fontWeight: '600' }}>★ {model.rating}</span>
              </div>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.8rem' }}>{model.name}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#6c63ff' }}>₹{model.price.toLocaleString('en-IN')}</div>
            </Link>
          ))}
        </div>

        {/* Custom Orders */}
        <div className="card" style={{ padding: '2rem', background: dark ? 'linear-gradient(135deg, #1a1040, #111)' : 'linear-gradient(135deg, #f0efff, #fff)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
            <Wrench size={18} color="#6c63ff" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Available for Custom Orders</h2>
          </div>
          <p style={{ color: subtext, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
            {builder.name} also takes custom build requests. Describe what you need and they'll send you a time and cost estimate within 48 hours.
          </p>
          <Link to="/custom-orders" className="btn-primary">Request a Custom Build</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}