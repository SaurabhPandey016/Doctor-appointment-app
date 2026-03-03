// Import routing components and dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'  // Notification system

// Import layout components
import Header from './components/Header'
import Footer from './components/Footer'

// Import authentication pages
import Login from './pages/Login'
import Signup from './pages/Signup'

// Import main pages
import Home from './pages/Home'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Services from './pages/Services'

// Import protected route wrapper
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
  // Main application component with routing configuration
  return (
    <BrowserRouter>
      {/* Toast notification container - positioned bottom-right with auto-close */}
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      
      {/* Header displayed on all pages */}
      <Header />
      
      {/* Main content area with flexible height */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {/* Define all application routes */}
          <Routes>
            {/* Public routes - accessible without authentication */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<Services />} />
            
            {/* Protected routes - require valid JWT token */}
            <Route element={<ProtectedRoute />}>
              <Route path='/book' element={<BookAppointment />} />
              <Route path='/appointments' element={<MyAppointments />} />
              <Route path='/profile' element={<MyProfile />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}