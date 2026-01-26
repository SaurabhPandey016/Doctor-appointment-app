import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/features/auth/authSlice'
import { FaBars, FaSignOutAlt, FaTimes } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import { User, LogOut } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user } = useSelector(state => state.auth)

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setMobileMenuOpen(false)
    setProfileMenuOpen(false)
  }

  return (
    <header className="bg-gradient-to-r from-slate-900 via-emerald-900/70 to-slate-900 border-b border-emerald-500/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="../public/logo-single.png" alt="MediMeet" className="h-10 w-10 rounded-lg" />
          <div>
            <span className="font-bold text-lg text-white">Medi</span>
            <span className="font-bold text-lg text-emerald-400">Meet</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-slate-300">
          <Link to="/" className="hover:text-emerald-400 transition-colors text-sm">Home</Link>
          <Link to="/services" className="hover:text-emerald-400 transition-colors text-sm">Find Doctors</Link>
          {token && (
            <>
              <Link to="/appointments" className="hover:text-emerald-400 transition-colors text-sm">My Appointments</Link>
              <Link to="/profile" className="hover:text-emerald-400 transition-colors text-sm">My Profile</Link>
            </>
          )}
          {!token && (
            <>
              <Link to="/login" className="hover:text-emerald-400 transition-colors text-sm">Login</Link>
              <Link to="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg transition-colors text-sm">Sign Up</Link>
            </>
          )}
        </nav>

        {/* Profile Dropdown for Desktop */}
        {token && user && (
          <div className="hidden md:block relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500/50 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden shadow-lg">
                {user.profilePicture ? (
                  <img
                    src={`http://localhost:5000${user.profilePicture}`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-emerald-400" />
                )}
              </div>
              <span className="text-sm text-white font-medium hidden lg:block">{user.name}</span>
            </button>

            {/* Dropdown Menu */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-emerald-500/30 rounded-lg shadow-xl overflow-hidden z-10">
                <div className="px-4 py-3 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent">
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className="text-slate-400 text-xs">{user.email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-4 py-3 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all text-sm"
                >
                  <User className="h-4 w-4" />
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-3 text-red-400 hover:bg-red-500/20 transition-all text-sm border-t border-emerald-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-emerald-400 text-xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800/90 border-t border-emerald-500/20 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-2">Home</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-2">Find Doctors</Link>
          {token && (
            <>
              <Link to="/appointments" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-2">My Appointments</Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-2">My Profile</Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left text-red-400 hover:text-red-300 flex items-center gap-2 py-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
          {!token && (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-2">Login</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-center">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}