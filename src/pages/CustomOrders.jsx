import { useState } from 'react'
import { useTheme } from '../ThemeContext'
import { Wrench, Clock, CheckCircle, ChevronDown, ChevronUp, Send } from 'lucide-react'

const customBuilders = [
  { id: 1, name: 'NovaTech', avatar: '🧑‍💻', sector: 'Healthcare', type: 'Software', rating: 4.8, responseTime: '< 12 hrs', minBudget: 15000, maxBudget: 200000, deliveryTime: '3–8 weeks', verified: true, expertise: ['AI/ML Models', 'Web Applications', 'Data Dashboards', 'API Integrations'], pastWork: ['Hospital diagnostic tool', 'Patient management system', 'Medical report generator'], desc: 'We take custom software orders in healthcare and AI. Share your idea and we will send a detailed cost and timeline estimate within 12 hours.' },
  { id: 2, name: 'GreenCore', avatar: '👩‍🔬', sector: 'Agriculture', type: 'Hardware', rating: 4.6, responseTime: '< 24 hrs', minBudget: 20000, maxBudget: 300000, deliveryTime: '4–10 weeks', verified: true, expertise: ['IoT Sensor Arrays', 'Embedded Systems', 'PCB Design', 'Field Robotics'], pastWork: ['Custom irrigation controller', 'Soil nutrient monitor', 'Greenhouse automation unit'], desc: 'Hardware custom orders for agriculture and IoT. We design, prototype, and ship field-ready devices tailored to your farm or research setup.' },
  { id: 3, name: 'LearnLab', avatar: '👨‍🏫', sector: 'Education', type: 'Software', rating: 4.9, responseTime: '< 8 hrs', minBudget: 10000, maxBudget: 150000, deliveryTime: '2–6 weeks', verified: true, expertise: ['LMS Platforms', 'AI Tutoring Bots', 'Quiz Engines', 'Progress Analytics'], pastWork: ['Custom school LMS', 'Adaptive quiz platform', 'Parent-teacher communication app'], desc: 'EdTech software custom builds. From simple quiz apps to full LMS platforms — we scope, build, and deliver fast.' },
  { id: 4, name: 'VoltSys', avatar: '👩‍🔧', sector: 'Energy', type: 'Hardware', rating: 4.7, responseTime: '< 24 hrs', minBudget: 25000, maxBudget: 500000, deliveryTime: '5–12 weeks', verified: true, expertise: ['Power Monitoring', 'Solar Systems', 'Smart Metering', 'Grid Analytics'], pastWork: ['Factory energy monitor', 'Solar farm dashboard', 'EV charging unit prototype'], desc: 'Custom energy hardware for residential, commercial, and industrial clients. We handle design, testing, and delivery.' },
  { id: 5, name: 'CapitalX', avatar: '👨‍💼', sector: 'Finance', type: 'Software', rating: 4.5, responseTime: '< 24 hrs', minBudget: 20000, maxBudget: 250000, deliveryTime: '3–8 weeks', verified: false, expertise: ['Trading Algorithms', 'Portfolio Tools', 'Risk Analytics', 'Fintech APIs'], pastWork: ['Custom algo trading bot', 'Mutual fund tracker', 'Invoice management tool'], desc: 'Fintech software custom orders. We build trading tools, analytics dashboards, and financial management apps.' },
  { id: 6, name: 'ShieldTech', avatar: '🧑‍✈️', sector: 'Defense', type: 'Hardware', rating: 4.4, responseTime: '< 48 hrs', minBudget: 50000, maxBudget: 1000000, deliveryTime: '8–20 weeks', verified: false, expertise: ['Surveillance Systems', 'Drone Hardware', 'Access Control', 'Perimeter Security'], pastWork: ['Campus CCTV network', 'Warehouse drone patrol', 'Smart access gate'], desc: 'Defense and security hardware custom builds for institutions, factories, and commercial properties.' },
]

const typeFilters = ['All', 'Software', 'Hardware']
const sectorFilters = ['All', 'Healthcare', 'Agriculture', 'Education', 'Finance', 'Defense', 'Energy']

export default function CustomOrders() {
  const { dark } = useTheme()
  const [type, setType] = useState('All')
  const [sector, setSector] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [showForm, setShowForm] = useState(null)
  const [submitted, setSubmitted] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', description: '', budget: '' })

  const bg = dark ? '#0a0a0a' : '#f8f8f8'
  const cardBg = dark ? '#111' : '#fff'
  const border = dark ? '#222' : '#eee'
  const text = dark ? '#f0f0f0' : '#111'
  const subtext = dark ? '#aaa' : '#555'

  const filtered = customBuilders
    .filter(b => type === 'All' || b.type === type)
    .filter(b => sector === 'All' || b.sector === sector)

  const handleSubmit = (builderId) => {
    setTimeout(() => {
      setSubmitted(builderId)
      setShowForm(null)
      setForm({ name: '', email: '', description: '', budget: '' })
    }, 1000)
  }

  return (
    <div style={{ background: bg, minHeight: '100vh', transition: 'background 0.3s ease', color: text }}>
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f, #1a1040)', padding: '3.5rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff11', border: '1px solid #6c63ff44', borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '0.85rem', color: '#a89dff', marginBottom: '1.5rem' }}>
          <Wrench size={14} /> Custom Build Requests
        </div>
        <h1 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Commission a Custom Prototype</h1>
        <p style={{ color: '#aaa', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>Browse builders who take custom orders. Share your idea, get a cost and time estimate, and proceed only if you're satisfied.</p>
      </div>

      <div style={{ background: cardBg, borderBottom: `1px solid ${border}`, padding: '1.5rem 2rem', transition: 'background 0.3s ease' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['1', 'Browse builders by sector and type'], ['2', 'Submit your idea and budget'], ['3', 'Builder responds with estimate in 24–48 hrs'], ['4', 'Pay and track your custom build']].map(([num, text]) => (
            <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: subtext }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#6c63ff', color: '#fff', fontWeight: '700', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{num}</div>
              {text}
              {num !== '4' && <span style={{ color: '#ddd', margin: '0 0.2rem' }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: cardBg, borderBottom: `1px solid ${border}`, padding: '1rem 2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', transition: 'background 0.3s ease' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Type:</span>
          {typeFilters.map(t => (
            <button key={t} onClick={() => setType(t)} style={{ padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', background: type === t ? '#111' : dark ? '#1a1a1a' : '#f5f5f5', color: type === t ? '#fff' : dark ? '#aaa' : '#555', border: type === t ? '1px solid #555' : `1px solid ${border}` }}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Sector:</span>
          {sectorFilters.map(s => (
            <button key={s} onClick={() => setSector(s)} style={{ padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', background: sector === s ? '#6c63ff' : dark ? '#1a1a1a' : '#f5f5f5', color: sector === s ? '#fff' : dark ? '#aaa' : '#555', border: sector === s ? '1px solid #6c63ff' : `1px solid ${border}` }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Showing <strong style={{ color: text }}>{filtered.length}</strong> builders available for custom orders</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {filtered.map(builder => (
            <div key={builder.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', display: 'flex', gap: '1.2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: dark ? '#2a2040' : '#f0efff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{builder.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>{builder.name}</span>
                    {builder.verified && <span style={{ fontSize: '0.72rem', background: '#edfdf5', color: '#065f46', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: '600' }}>✓ Verified</span>}
                    <span className={`tag ${builder.type === 'Hardware' ? 'tag-green' : ''}`}>{builder.type}</span>
                    <span className="tag" style={{ background: dark ? '#2a1a00' : '#fff8e1', color: '#d97706' }}>{builder.sector}</span>
                  </div>
                  <p style={{ color: subtext, fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>{builder.desc}</p>
                  <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', fontSize: '0.82rem', color: '#888' }}>
                    <span>★ <strong style={{ color: '#f59e0b' }}>{builder.rating}</strong></span>
                    <span><Clock size={12} style={{ verticalAlign: 'middle' }} /> Responds {builder.responseTime}</span>
                    <span>⏱ {builder.deliveryTime} delivery</span>
                    <span>💰 ₹{builder.minBudget.toLocaleString('en-IN')} – ₹{builder.maxBudget.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: '140px' }}>
                  {submitted === builder.id ? (
                    <div style={{ background: '#edfdf5', color: '#065f46', padding: '0.7rem 1rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', textAlign: 'center' }}>
                      <CheckCircle size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} /> Request Sent!
                    </div>
                  ) : (
                    <button onClick={() => { setShowForm(showForm === builder.id ? null : builder.id); setExpanded(null) }} className="btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', justifyContent: 'center' }}>
                      <Send size={14} /> Send Request
                    </button>
                  )}
                  <button onClick={() => { setExpanded(expanded === builder.id ? null : builder.id); setShowForm(null) }} className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', justifyContent: 'center' }}>
                    {expanded === builder.id ? <><ChevronUp size={14} /> Less</> : <><ChevronDown size={14} /> Details</>}
                  </button>
                </div>
              </div>

              {expanded === builder.id && (
                <div style={{ borderTop: `1px solid ${border}`, padding: '1.5rem', background: dark ? '#0f0f0f' : '#fafafa', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.8rem', color: text }}>Expertise Areas</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {builder.expertise.map(e => <span key={e} className="tag">{e}</span>)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.8rem', color: text }}>Past Custom Work</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {builder.pastWork.map(w => (
                        <div key={w} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: subtext }}>
                          <CheckCircle size={13} color="#16a34a" /> {w}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {showForm === builder.id && (
                <div style={{ borderTop: `1px solid ${border}`, padding: '1.5rem', background: dark ? '#0f0f0f' : '#fafafa' }}>
                  <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '1.2rem', color: text }}>Send a Custom Build Request to {builder.name}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      style={{ padding: '0.7rem 1rem', borderRadius: '8px', border: `1px solid ${border}`, background: dark ? '#1a1a1a' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }} />
                    <input placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      style={{ padding: '0.7rem 1rem', borderRadius: '8px', border: `1px solid ${border}`, background: dark ? '#1a1a1a' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }} />
                  </div>
                  <textarea placeholder="Describe what you want built..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4}
                    style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1px solid ${border}`, background: dark ? '#1a1a1a' : '#fff', color: text, fontSize: '0.9rem', outline: 'none', resize: 'vertical', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }} />
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input placeholder="Your budget (₹)" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                      style={{ padding: '0.7rem 1rem', borderRadius: '8px', border: `1px solid ${border}`, background: dark ? '#1a1a1a' : '#fff', color: text, fontSize: '0.9rem', outline: 'none', width: '180px' }} />
                    <button onClick={() => handleSubmit(builder.id)} className="btn-primary" style={{ padding: '0.7rem 1.5rem' }} disabled={!form.name || !form.email || !form.description}>
                      <Send size={15} /> Submit Request
                    </button>
                    <button onClick={() => setShowForm(null)} className="btn-secondary" style={{ padding: '0.7rem 1rem' }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}