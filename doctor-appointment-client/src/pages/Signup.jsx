// Import required dependencies
import { useState } from 'react'
import axios from 'axios'                 // HTTP client for API requests
import { useNavigate, Link } from 'react-router-dom' // Navigation
import { toast } from 'react-toastify'   // Toast notifications
import { UserPlus, Mail, Phone, Lock, User } from 'lucide-react' // Icons

export default function Signup() {
  // Form state for signup fields
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  
  // Hook for navigation after successful signup
  const navigate = useNavigate()

  /**
   * Handle signup form submission
   * Validates all fields before sending to backend
   * On success: shows success message and navigates to login
   * On failure: displays error from server
   */
  const submitHandler = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault()
    
    // Validate all required fields are filled
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // Send signup request to backend
      await axios.post('https://doctor-appointment-app-p51b.onrender.com/api/auth/register', form)
      // Show success notification
      toast.success('Signup Successful! Please login.')
      // Redirect to login page so user can authenticate
      navigate('/login')
    } catch(error) {
      // Display server error message or generic error
      toast.error(error.response?.data?.message || 'Signup Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 py-8">
      <form onSubmit={submitHandler} className="border border-emerald-900/20 rounded-lg bg-slate-900/50 p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="h-8 w-8 text-emerald-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <User className="h-4 w-4 inline mr-2" />
              Full Name
            </label>
            <input
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Enter your name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Mail className="h-4 w-4 inline mr-2" />
              Email
            </label>
            <input
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Phone className="h-4 w-4 inline mr-2" />
              Phone Number
            </label>
            <input
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
              type="tel"
              placeholder="Enter your phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Lock className="h-4 w-4 inline mr-2" />
              Password
            </label>
            <input
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Creating account...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Sign Up
            </>
          )}
        </button>

        <p className="text-center text-slate-400 mt-4">
          Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300">Login</Link>
        </p>
      </form>
    </div>
  )
}