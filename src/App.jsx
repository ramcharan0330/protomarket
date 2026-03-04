import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import { ThemeProvider } from './ThemeContext'
import Navbar from './components/Navbar'
import PageWrapper from './components/PageWrapper'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import Trending from './pages/Trending'
import CustomOrders from './pages/CustomOrders'
import ModelDetail from './pages/ModelDetail'
import BuilderProfile from './pages/BuilderProfile'
import Login from './pages/Login'
import BuilderDashboard from './pages/BuilderDashboard'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <PageWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/custom-orders" element={<CustomOrders />} />
                <Route path="/model/:id" element={<ModelDetail />} />
                <Route path="/builder/:id" element={<BuilderProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<BuilderDashboard />} />
              </Routes>
            </PageWrapper>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App