import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Shield, Package, MessageCircle, Settings } from 'lucide-react'
import { useState } from 'react'

const allModels = [
  { id: 1, name: 'MediScan AI', category: 'Healthcare', type: 'Software', price: 24999, builder: 'NovaTech', builderId: 1, rating: 4.8, tags: ['AI', 'Diagnostics'], desc: 'AI-powered medical image analysis prototype for early disease detection.', longDesc: 'MediScan AI is a fully functional prototype that uses deep learning models to analyze medical images such as X-rays and MRI scans. It flags anomalies with high accuracy and generates a structured report for medical professionals. Built using Python, TensorFlow, and a React dashboard.', configs: ['Basic (single scan module)', 'Standard (multi-scan + report gen)', 'Pro (full dashboard + API access)'], configPrices: [24999, 34999, 49999], reviews: [{ user: 'Dr. Sharma', text: 'Impressive accuracy on chest X-rays. Great starting point for a hospital pilot.', rating: 5 }, { user: 'Rahul M.', text: 'Clean codebase and well documented. Easy to integrate.', rating: 4 }] },
  { id: 2, name: 'AgroBot v2', category: 'Agriculture', type: 'Hardware', price: 41999, builder: 'GreenCore', builderId: 2, rating: 4.6, tags: ['Robot', 'IoT'], desc: 'Autonomous farming robot with soil analysis and precision irrigation.', longDesc: 'AgroBot v2 is a hardware prototype designed for small to mid-scale farms. It autonomously navigates crop rows, analyzes soil moisture and nutrients using onboard sensors, and activates targeted irrigation. Comes with a companion mobile app for monitoring.', configs: ['Base Unit (navigation only)', 'Standard (navigation + soil sensors)', 'Full Kit (all sensors + mobile app)'], configPrices: [41999, 54999, 69999], reviews: [{ user: 'Vikram S.', text: 'Worked well on our 2-acre farm. Saved a lot of water.', rating: 5 }, { user: 'Priya K.', text: 'Setup was a bit tricky but support was helpful.', rating: 4 }] },
  { id: 3, name: 'EduFlow LMS', category: 'Education', type: 'Software', price: 16999, builder: 'LearnLab', builderId: 3, rating: 4.9, tags: ['Learning', 'SaaS'], desc: 'Modular learning management system with real-time progress tracking.', longDesc: 'EduFlow is a modular LMS prototype built for schools and coaching institutes. It supports course creation, live classes, assignments, and real-time student progress tracking. Built on Next.js with a PostgreSQL backend.', configs: ['Starter (up to 50 students)', 'Growth (up to 500 students)', 'Institution (unlimited + white label)'], configPrices: [16999, 29999, 54999], reviews: [{ user: 'Anita R.', text: 'Our coaching centre adopted this and students love it.', rating: 5 }, { user: 'Suresh T.', text: 'Very clean UI and fast. Would love offline support too.', rating: 5 }] },
  { id: 4, name: 'PowerGrid Monitor', category: 'Energy', type: 'Hardware', price: 54999, builder: 'VoltSys', builderId: 4, rating: 4.7, tags: ['IoT', 'Monitor'], desc: 'Smart grid monitoring device with live analytics and fault detection.', longDesc: 'PowerGrid Monitor is an IoT hardware prototype that attaches to power distribution panels and monitors voltage, current, and power quality in real time. It sends alerts for faults and generates consumption reports via a web dashboard.', configs: ['Single Phase Monitor', 'Three Phase Monitor', 'Enterprise (multi-panel + cloud)'], configPrices: [54999, 74999, 119999], reviews: [{ user: 'Electrical Dept, IIT', text: 'Used in our lab setup. Accurate readings and good dashboard.', rating: 5 }, { user: 'Ramesh E.', text: 'Solid build quality. Alert system works reliably.', rating: 4 }] },
  { id: 5, name: 'FinTrack Pro', category: 'Finance', type: 'Software', price: 19999, builder: 'CapitalX', builderId: 5, rating: 4.5, tags: ['Fintech', 'Analytics'], desc: 'Personal finance tracker with AI-based spending insights.', longDesc: 'FinTrack Pro is a web application prototype that connects to bank accounts via open banking APIs and categorizes transactions automatically. The AI module identifies spending patterns and suggests savings opportunities.', configs: ['Personal (1 account)', 'Family (up to 5 accounts)', 'Advisor (client management dashboard)'], configPrices: [19999, 29999, 49999], reviews: [{ user: 'Neha G.', text: 'Really helped me understand where my money was going.', rating: 5 }, { user: 'Karan P.', text: 'Good prototype. Needs more bank integrations though.', rating: 4 }] },
  { id: 6, name: 'SecureCam 360', category: 'Defense', type: 'Hardware', price: 34999, builder: 'ShieldTech', builderId: 6, rating: 4.4, tags: ['Security', 'IoT'], desc: 'AI-enabled 360° surveillance camera with motion intelligence.', longDesc: 'SecureCam 360 is a hardware prototype featuring a 360-degree camera module with onboard AI for motion detection, face recognition, and anomaly alerts. Streams live to a web dashboard with recording capability.', configs: ['Basic (motion detection only)', 'Standard (+ face recognition)', 'Pro (+ cloud storage + alerts)'], configPrices: [34999, 49999, 69999], reviews: [{ user: 'Housing Society, Pune', text: 'Installed at our gate. Works great at night too.', rating: 4 }, { user: 'Anil S.', text: 'Face recognition needs improvement but overall solid.', rating: 4 }] },
  { id: 7, name: 'CropSense IoT', category: 'Agriculture', type: 'Hardware', price: 28999, builder: 'GreenCore', builderId: 2, rating: 4.3, tags: ['IoT', 'Sensors'], desc: 'Soil moisture and nutrient sensor array for smart farming.', longDesc: 'CropSense is a wireless sensor array prototype that measures soil moisture, pH, nitrogen, phosphorus, and potassium levels. Data is transmitted to a mobile app for actionable crop recommendations.', configs: ['4-sensor kit', '8-sensor kit', '16-sensor kit + dashboard'], configPrices: [28999, 44999, 69999], reviews: [{ user: 'Farmer Collective, MP', text: 'Helped us reduce fertilizer usage significantly.', rating: 4 }, { user: 'AgriResearch Lab', text: 'Accurate sensors and reliable wireless transmission.', rating: 5 }] },
  { id: 8, name: 'MedAlert Wearable', category: 'Healthcare', type: 'Hardware', price: 12999, builder: 'PulseWorks', builderId: 7, rating: 4.6, tags: ['Wearable', 'Health'], desc: 'Real-time vitals monitoring wearable with emergency alert system.', longDesc: 'MedAlert is a wrist-worn hardware prototype that continuously monitors heart rate, SpO2, and body temperature. It sends emergency SMS and app alerts if readings go critical. Designed for elderly care and hospital use.', configs: ['Basic (monitoring only)', 'Standard (+ app alerts)', 'Pro (+ family dashboard + SMS)'], configPrices: [12999, 17999, 24999], reviews: [{ user: 'Old Age Home, Chennai', text: 'Very helpful for our residents. Simple to use.', rating: 5 }, { user: 'Dr. Meena', text: 'Good accuracy for a prototype. Alert system is reliable.', rating: 4 }] },
  { id: 9, name: 'ClassBot AI', category: 'Education', type: 'Software', price: 9999, builder: 'LearnLab', builderId: 3, rating: 4.7, tags: ['AI', 'Tutor'], desc: 'AI tutoring assistant that adapts to student learning pace.', longDesc: 'ClassBot is an AI tutoring prototype that uses NLP to answer student questions, quiz them interactively, and adapt difficulty based on performance. Supports Math, Science, and English for grades 6-12.', configs: ['Single subject', '3 subjects bundle', 'Full curriculum (all subjects)'], configPrices: [9999, 19999, 34999], reviews: [{ user: 'Parent, Hyderabad', text: 'My daughter uses it daily. Her math improved a lot.', rating: 5 }, { user: 'School Teacher', text: 'Great supplement to classroom teaching.', rating: 5 }] },
  { id: 10, name: 'SolarSync', category: 'Energy', type: 'Hardware', price: 39999, builder: 'VoltSys', builderId: 4, rating: 4.8, tags: ['Solar', 'IoT'], desc: 'Solar panel efficiency optimizer with predictive maintenance alerts.', longDesc: 'SolarSync is an IoT device that monitors solar panel output in real time, detects underperforming panels, and predicts maintenance needs using historical data. Compatible with most residential and commercial solar setups.', configs: ['Up to 10 panels', 'Up to 30 panels', 'Commercial (100+ panels + API)'], configPrices: [39999, 59999, 99999], reviews: [{ user: 'Rooftop Solar User', text: 'Found 2 faulty panels I had no idea about. Worth it.', rating: 5 }, { user: 'Solar Installer Co.', text: 'We now recommend this to all our clients.', rating: 5 }] },
  { id: 11, name: 'TradePilot', category: 'Finance', type: 'Software', price: 29999, builder: 'CapitalX', builderId: 5, rating: 4.6, tags: ['Trading', 'AI'], desc: 'Algorithmic trading prototype with backtesting and live signals.', longDesc: 'TradePilot is a trading prototype that lets users build, backtest, and deploy algorithmic trading strategies on NSE/BSE data. Includes a signal dashboard, risk metrics, and paper trading mode.', configs: ['Backtesting only', 'Live signals (paper trade)', 'Full (live execution + risk mgmt)'], configPrices: [29999, 44999, 74999], reviews: [{ user: 'Retail Trader, Mumbai', text: 'Backtesting engine is really powerful. Saved me months of coding.', rating: 5 }, { user: 'Quant Analyst', text: 'Solid foundation. Needed some customization but great base.', rating: 4 }] },
  { id: 12, name: 'DronePatrol', category: 'Defense', type: 'Hardware', price: 89999, builder: 'ShieldTech', builderId: 6, rating: 4.9, tags: ['Drone', 'AI'], desc: 'Autonomous patrol drone with obstacle avoidance and live feed.', longDesc: 'DronePatrol is a fully autonomous patrol drone prototype with AI-based obstacle avoidance, pre-programmed patrol routes, and a live encrypted video feed. Designed for perimeter security of large facilities.', configs: ['Basic (manual + live feed)', 'Standard (autonomous patrol)', 'Pro (multi-drone fleet management)'], configPrices: [89999, 124999, 199999], reviews: [{ user: 'Factory Security Team', text: 'Replaced 2 security guard shifts. ROI in 3 months.', rating: 5 }, { user: 'Defense Researcher', text: 'Impressive obstacle avoidance for a prototype.', rating: 5 }] },
]

export default function ModelDetail() {
  const { dark } = useTheme()
  const bg = dark ? '#0a0a0a' : '#f8f8f8'
  const cardBg = dark ? '#111' : '#fff'
  const border = dark ? '#222' : '#eee'
  const text = dark ? '#f0f0f0' : '#111'
  const subtext = dark ? '#aaa' : '#555'
  const { id } = useParams()
  const model = allModels.find(m => m.id === parseInt(id))
  const [selectedConfig, setSelectedConfig] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [paying, setPaying] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const unlockFee = model ? Math.max(499, Math.round(
    (model.configPrices[selectedConfig] * 0.015 + (model.rating - 4) * 500) / 100
  ) * 100) : 499
  const mediaImages = [
  'https://picsum.photos/seed/proto1/800/400',
  'https://picsum.photos/seed/proto2/800/400',
  'https://picsum.photos/seed/proto3/800/400',
  'https://picsum.photos/seed/proto4/800/400',
]
const demoVideo = 'https://www.youtube.com/embed/dQw4w9WgXcQ'

  if (!model) return (
    <div style={{ textAlign: 'center', padding: '5rem', color: '#888', background: bg, minHeight: '100vh' }}>
      <div style={{ fontSize: '3rem' }}>🔍</div>
      <div style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1rem' }}>Model not found</div>
      <Link to="/marketplace" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Back to Marketplace</Link>
    </div>
  )

  const handleUnlock = () => {
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      setUnlocked(true)
    }, 1500)
  }

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

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>

          {/* Left */}
          <div>
            {/* Media Gallery */}
<div className="card" style={{ padding: '0', marginBottom: '1.5rem', overflow: 'hidden' }}>
  {/* Main Image */}
  <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: '#111' }}>
    <img
      src={mediaImages[activeImage]}
      alt="product"
      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
    />
    <button onClick={() => setActiveImage(i => (i - 1 + mediaImages.length) % mediaImages.length)}
      style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <ChevronLeft size={18} />
    </button>
    <button onClick={() => setActiveImage(i => (i + 1) % mediaImages.length)}
      style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <ChevronRight size={18} />
    </button>
    <div style={{ position: 'absolute', bottom: '0.8rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.4rem' }}>
      {mediaImages.map((_, i) => (
        <div key={i} onClick={() => setActiveImage(i)} style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeImage === i ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'background 0.2s' }} />
      ))}
    </div>
  </div>

  {/* Thumbnails */}
  <div style={{ display: 'flex', gap: '0.5rem', padding: '0.8rem', background: dark ? '#111' : '#f9f9f9', borderTop: `1px solid ${border}` }}>
    {mediaImages.map((img, i) => (
      <img key={i} src={img} alt={`thumb-${i}`} onClick={() => setActiveImage(i)}
        style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: activeImage === i ? '2px solid #6c63ff' : `2px solid ${border}`, transition: 'border 0.2s', opacity: activeImage === i ? 1 : 0.6 }} />
    ))}
    {/* Video thumbnail */}
    <div onClick={() => setActiveImage(4)}
      style={{ width: '64px', height: '48px', borderRadius: '6px', cursor: 'pointer', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: activeImage === 4 ? '2px solid #6c63ff' : `2px solid ${border}`, flexShrink: 0 }}>
      <span style={{ fontSize: '1.2rem' }}>▶️</span>
    </div>
  </div>

  {/* Video embed - shows when video thumbnail clicked */}
  {activeImage === 4 && (
    <div style={{ padding: '0 0.8rem 0.8rem' }}>
      <iframe
        width="100%" height="220"
        src={demoVideo}
        title="Demo Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: '8px' }}
      />
    </div>
  )}
</div>
            {/* Header */}
            <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className={`tag ${model.type === 'Hardware' ? 'tag-green' : ''}`}>{model.type}</span>
                <span className="tag" style={{ background: dark ? '#2a1a00' : '#fff8e1', color: '#d97706' }}>{model.category}</span>
                {model.tags.map(t => (
                  <span key={t} style={{ background: dark ? '#222' : '#f5f5f5', color: dark ? '#aaa' : '#555', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '500' }}>{t}</span>
                ))}
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>{model.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Link to={`/builder/${model.builderId}`} style={{ color: '#6c63ff', fontWeight: '600', fontSize: '0.9rem' }}>by {model.builder}</Link>
                <span style={{ color: '#f59e0b', fontWeight: '600', fontSize: '0.9rem' }}>★ {model.rating}</span>
              </div>
              <p style={{ color: subtext, lineHeight: 1.8, fontSize: '0.95rem' }}>{model.longDesc}</p>
            </div>

            {/* Configurations */}
            <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Settings size={18} color="#6c63ff" />
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Available Configurations</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {model.configs.map((config, i) => (
                  <div key={i} onClick={() => setSelectedConfig(i)} style={{
                    padding: '1rem 1.2rem', borderRadius: '10px', cursor: 'pointer',
                    border: selectedConfig === i ? '2px solid #6c63ff' : `2px solid ${border}`,
                    background: selectedConfig === i ? (dark ? '#2a2040' : '#f0efff') : cardBg,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem', color: selectedConfig === i ? '#6c63ff' : text }}>{config}</div>
                    <div style={{ fontWeight: '800', color: '#6c63ff', fontSize: '1rem' }}>₹{model.configPrices[i].toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Star size={18} color="#f59e0b" />
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Buyer Reviews</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {model.reviews.map((r, i) => (
                  <div key={i} style={{ padding: '1rem', background: dark ? '#222' : '#f9f9f9', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{r.user}</span>
                      <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p style={{ color: subtext, fontSize: '0.88rem', lineHeight: 1.6 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Buy Panel */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div className="card" style={{ padding: '1.8rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.3rem' }}>Selected Configuration</div>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.5rem' }}>{model.configs[selectedConfig]}</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#6c63ff', marginBottom: '1.5rem' }}>
                ₹{model.configPrices[selectedConfig].toLocaleString('en-IN')}
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.8rem', padding: '0.9rem' }}>
                <Package size={16} /> Buy Now
              </button>

              {!unlocked ? (
                <div>
                  <div style={{ background: dark ? '#2a1a00' : '#fff8e1', border: `1px solid ${dark ? '#92400e' : '#fde68a'}`, borderRadius: '10px', padding: '1rem', marginBottom: '0.8rem', fontSize: '0.82rem', color: dark ? '#fcd34d' : '#92400e', lineHeight: 1.6 }}>
                    <Shield size={14} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />
                    Pay a small unlock fee of <strong>₹{unlockFee.toLocaleString('en-IN')}</strong> to contact this builder directly. This prevents spam and protects both parties.
                  </div>
                  <button onClick={handleUnlock} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
                    {paying ? '⏳ Processing...' : <><MessageCircle size={16} /> Unlock Builder Contact · ₹{unlockFee.toLocaleString('en-IN')}</>}
                  </button>
                </div>
              ) : (
                <div style={{ background: '#edfdf5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '1.2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
                  <div style={{ fontWeight: '700', color: '#065f46', marginBottom: '0.3rem' }}>Builder Unlocked!</div>
                  <div style={{ fontSize: '0.85rem', color: '#065f46' }}>contact@{model.builder.toLowerCase()}.in</div>
                  <Link to={`/builder/${model.builderId}`} style={{ display: 'block', marginTop: '0.8rem', color: '#6c63ff', fontWeight: '600', fontSize: '0.85rem' }}>
                    View Builder Profile →
                  </Link>
                </div>
              )}

              <div style={{ borderTop: `1px solid ${border}`, marginTop: '1.2rem', paddingTop: '1.2rem' }}>
                {[['🔒', 'Escrow-protected payment'], ['🔄', 'Configuration changes allowed'], ['📦', 'Source files included'], ['💬', 'Builder support included']].map(([icon, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', fontSize: '0.82rem', color: subtext }}>
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}