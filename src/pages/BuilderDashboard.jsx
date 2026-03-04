import { useState } from 'react'
import { useAuth } from '../AuthContext'
import { useTheme } from '../ThemeContext'
import { Link } from 'react-router-dom'
import { Plus, Eye, ShoppingBag, Star, Clock, CheckCircle, XCircle, TrendingUp, Upload } from 'lucide-react'
import Footer from '../components/Footer'

const mockListings = [
  { id: 1, name: 'MediScan AI', type: 'Software', price: 24999, views: 342, sales: 8, rating: 4.8, status: 'active' },
  { id: 2, name: 'HealthTrack Pro', type: 'Software', price: 18999, views: 198, sales: 4, rating: 4.6, status: 'active' },
]

const mockRequests = [
  { id: 1, buyer: 'Rahul M.', location: 'Mumbai', desc: 'Need a custom patient monitoring dashboard for a 50-bed hospital. Should integrate with existing hardware.', budget: 85000, time: '2 hrs ago', status: 'pending' },
  { id: 2, buyer: 'Priya S.', location: 'Delhi', desc: 'Looking for an AI-based diagnostic tool for dermatology. Need mobile app + web dashboard.', budget: 120000, time: '5 hrs ago', status: 'pending' },
  { id: 3, buyer: 'Ankit R.', location: 'Bangalore', desc: 'Custom telemedicine platform with video consultation and prescription management.', budget: 200000, time: '1 day ago', status: 'accepted' },
]

const sectors = ['Healthcare', 'Agriculture', 'Education', 'Finance', 'Defense', 'Energy']

export default function BuilderDashboard() {
  const { user, userRole } = useAuth()
  const { dark } = useTheme()
  const bg = dark ? '#0a0a0a' : '#f8f8f8'
  const cardBg = dark ? '#111' : '#fff'
  const border = dark ? '#222' : '#eee'
  const text = dark ? '#f0f0f0' : '#111'
  const subtext = dark ? '#aaa' : '#555'

  const [requests, setRequests] = useState(mockRequests)
  const [activeTab, setActiveTab] = useState('overview')
  const [newModel, setNewModel] = useState({ name: '', type: 'Software', sector: 'Healthcare', price: '', desc: '', configs: '', videoUrl: '', tags: '' })
  const [submitted, setSubmitted] = useState(false)

  if (!user || userRole !== 'builder') {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', background: bg, minHeight: '100vh', color: text }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
        <div style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Builder Access Only</div>
        <div style={{ color: '#888', marginBottom: '1.5rem' }}>You need to be logged in as a builder to view this page.</div>
        <Link to="/login" className="btn-primary">Login as Builder</Link>
      </div>
    )
  }

  const handleAccept = (id) => setRequests(r => r.map(req => req.id === id ? { ...req, status: 'accepted' } : req))
  const handleDecline = (id) => setRequests(r => r.map(req => req.id === id ? { ...req, status: 'declined' } : req))

  const handleAddModel = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setNewModel({ name: '', type: 'Software', sector: 'Healthcare', price: '', desc: '', configs: '', videoUrl: '', tags: '' })
    }, 2000)
  }

  const totalViews = mockListings.reduce((a, b) => a + b.views, 0)
  const totalSales = mockListings.reduce((a, b) => a + b.sales, 0)
  const avgRating = (mockListings.reduce((a, b) => a + b.rating, 0) / mockListings.length).toFixed(1)
  const pendingCount = requests.filter(r => r.status === 'pending').length
  const unlockFee = avgRating >= 4.8 ? 999 : avgRating >= 4.5 ? 699 : 499
  const tabs = ['overview', 'listings', 'requests', 'add model']

  return (
    <div style={{ background: bg, minHeight: '100vh', transition: 'background 0.3s ease', color: text }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f, #1a1040)', padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={user.photoURL} alt="avatar" style={{ width: '56px', height: '56px', borderRadius: '50%', border: '3px solid #6c63ff' }} />
            <div>
              <div style={{ color: '#fff', fontWeight: '800', fontSize: '1.3rem' }}>Welcome, {user.displayName?.split(' ')[0]} 👋</div>
              <div style={{ color: '#a89dff', fontSize: '0.85rem', marginTop: '0.2rem' }}>Builder Dashboard · ProtoMarket Beta</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            {pendingCount > 0 && (
              <div style={{ background: '#e11d4822', border: '1px solid #e11d4855', color: '#fca5a5', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600' }}>
                🔔 {pendingCount} pending request{pendingCount > 1 ? 's' : ''}
              </div>
            )}
            <div style={{ background: '#6c63ff22', border: '1px solid #6c63ff44', color: '#a89dff', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600' }}>
              Unlock Fee: ₹{unlockFee}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: cardBg, borderBottom: `1px solid ${border}`, padding: '0 2rem', transition: 'background 0.3s ease' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '1rem 1.5rem', border: 'none', background: 'transparent',
              fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer',
              color: activeTab === tab ? '#6c63ff' : '#888',
              borderBottom: activeTab === tab ? '2px solid #6c63ff' : '2px solid transparent',
              transition: 'all 0.2s', textTransform: 'capitalize'
            }}>
              {tab === 'requests' && pendingCount > 0 ? `Requests (${pendingCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { icon: <Eye size={20} color="#6c63ff" />, label: 'Total Views', value: totalViews },
                { icon: <ShoppingBag size={20} color="#16a34a" />, label: 'Total Sales', value: totalSales },
                { icon: <Star size={20} color="#f59e0b" />, label: 'Avg Rating', value: '★ ' + avgRating },
                { icon: <TrendingUp size={20} color="#e11d48" />, label: 'Marketplace Rank', value: '#2' },
              ].map(stat => (
                <div key={stat.label} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: dark ? '#222' : '#f5f5f5', padding: '0.8rem', borderRadius: '10px' }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: dark ? 'linear-gradient(135deg, #1a1040, #111)' : 'linear-gradient(135deg, #f0efff, #fff)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <TrendingUp size={18} color="#6c63ff" />
                    <span style={{ fontWeight: '700', fontSize: '1rem' }}>Your Trending Rank</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#6c63ff' }}>🥈 #2 This Month</div>
                  <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.3rem' }}>Top sector: Healthcare · 28% growth</div>
                </div>
                <Link to="/trending" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>View Full Rankings</Link>
              </div>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>Recent Custom Requests</div>
                <button onClick={() => setActiveTab('requests')} style={{ background: 'none', border: 'none', color: '#6c63ff', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>View All →</button>
              </div>
              {requests.slice(0, 2).map(req => (
                <div key={req.id} style={{ padding: '1rem', background: dark ? '#222' : '#f9f9f9', borderRadius: '10px', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{req.buyer} · {req.location}</span>
                    <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{req.time}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: subtext, marginBottom: '0.5rem' }}>{req.desc.slice(0, 80)}...</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#6c63ff' }}>Budget: ₹{req.budget.toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem' }}>Your Listed Prototypes</h2>
              <button onClick={() => setActiveTab('add model')} className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                <Plus size={15} /> Add New Model
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mockListings.map(model => (
                <div key={model.id} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '1rem' }}>{model.name}</span>
                      <span className={`tag ${model.type === 'Hardware' ? 'tag-green' : ''}`}>{model.type}</span>
                      <span style={{ background: '#edfdf5', color: '#16a34a', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '600' }}>● Active</span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#6c63ff' }}>₹{model.price.toLocaleString('en-IN')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {[[<Eye size={14} />, model.views, 'views'], [<ShoppingBag size={14} />, model.sales, 'sales'], [<Star size={14} />, model.rating, 'rating']].map(([icon, val, label], i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '700', fontSize: '0.95rem', justifyContent: 'center' }}>{icon} {val}</div>
                        <div style={{ fontSize: '0.72rem', color: '#aaa' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <Link to={`/model/${model.id}`} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>View Listing</Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Custom Build Requests</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {requests.map(req => (
                <div key={req.id} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: '700', fontSize: '1rem' }}>{req.buyer}</span>
                        <span style={{ color: '#888', fontSize: '0.85rem' }}>from {req.location}</span>
                        <span style={{
                          padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700',
                          background: req.status === 'pending' ? '#fff8e1' : req.status === 'accepted' ? '#edfdf5' : '#fff1f2',
                          color: req.status === 'pending' ? '#d97706' : req.status === 'accepted' ? '#16a34a' : '#e11d48'
                        }}>
                          {req.status === 'pending' ? '⏳ Pending' : req.status === 'accepted' ? '✓ Accepted' : '✗ Declined'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#aaa', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={12} /> {req.time}
                        </span>
                      </div>
                      <p style={{ color: subtext, fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>{req.desc}</p>
                      <div style={{ fontWeight: '700', color: '#6c63ff', fontSize: '0.95rem' }}>Budget: ₹{req.budget.toLocaleString('en-IN')}</div>
                    </div>
                    {req.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <button onClick={() => handleAccept(req.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#edfdf5', color: '#16a34a', border: '1px solid #6ee7b7', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>
                          <CheckCircle size={15} /> Accept
                        </button>
                        <button onClick={() => handleDecline(req.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#fff1f2', color: '#e11d48', border: '1px solid #fca5a5', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>
                          <XCircle size={15} /> Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Model Tab */}
        {activeTab === 'add model' && (
          <div style={{ maxWidth: '680px' }}>
            <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '1.5rem' }}>List a New Prototype</h2>
            {submitted ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <div style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Model Submitted!</div>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>Your prototype listing is under review and will go live shortly.</div>
              </div>
            ) : (
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Model Name *</label>
                    <input value={newModel.name} onChange={e => setNewModel({ ...newModel, name: e.target.value })} placeholder="e.g. MediScan AI v2"
                      style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1.5px solid ${border}`, background: dark ? '#222' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Price (₹) *</label>
                    <input value={newModel.price} onChange={e => setNewModel({ ...newModel, price: e.target.value })} placeholder="e.g. 24999"
                      style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1.5px solid ${border}`, background: dark ? '#222' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Type *</label>
                    <select value={newModel.type} onChange={e => setNewModel({ ...newModel, type: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1.5px solid ${border}`, background: dark ? '#222' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }}>
                      <option>Software</option>
                      <option>Hardware</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Sector *</label>
                    <select value={newModel.sector} onChange={e => setNewModel({ ...newModel, sector: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1.5px solid ${border}`, background: dark ? '#222' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }}>
                      {sectors.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Description *</label>
                  <textarea value={newModel.desc} onChange={e => setNewModel({ ...newModel, desc: e.target.value })} placeholder="Describe your prototype..." rows={4}
                    style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1.5px solid ${border}`, background: dark ? '#222' : '#fff', color: text, fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Configuration Options</label>
                  <input value={newModel.configs} onChange={e => setNewModel({ ...newModel, configs: e.target.value })} placeholder="e.g. Basic, Standard, Pro (comma separated)"
                    style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1.5px solid ${border}`, background: dark ? '#222' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Tags</label>
                  <input value={newModel.tags} onChange={e => setNewModel({ ...newModel, tags: e.target.value })} placeholder="e.g. AI, IoT, Healthcare"
                    style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1.5px solid ${border}`, background: dark ? '#222' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Demo Video URL <span style={{ color: '#aaa', fontWeight: '400' }}>(YouTube or direct link)</span></label>
                  <input value={newModel.videoUrl} onChange={e => setNewModel({ ...newModel, videoUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..."
                    style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', border: `1.5px solid ${border}`, background: dark ? '#222' : '#fff', color: text, fontSize: '0.9rem', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: subtext, display: 'block', marginBottom: '0.4rem' }}>Product Images <span style={{ color: '#aaa', fontWeight: '400' }}>(up to 4)</span></label>
                  <div style={{ border: `2px dashed ${border}`, borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: 'pointer', background: dark ? '#111' : '#fafafa' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#6c63ff'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                    <Upload size={24} color="#aaa" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.88rem', color: '#888', marginBottom: '0.3rem' }}>Drag and drop images here or click to upload</div>
                    <div style={{ fontSize: '0.75rem', color: '#bbb' }}>PNG, JPG up to 5MB each</div>
                  </div>
                </div>
                <button onClick={handleAddModel} className="btn-primary" disabled={!newModel.name || !newModel.price || !newModel.desc} style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
                  <Plus size={16} /> Submit Listing for Review
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}