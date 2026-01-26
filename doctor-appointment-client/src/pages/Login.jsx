import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LogIn } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await dispatch(loginUser({ email, password })).unwrap()
      toast.success('Login Successful')
      navigate('/')
    } catch(error) {
      toast.error('Invalid Credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 py-8">
      <form onSubmit={submitHandler} className="border border-emerald-900/20 rounded-lg bg-slate-900/50 p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="h-8 w-8 text-emerald-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Password</label>
            <input
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              Logging in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Login
            </>
          )}
        </button>

        <p className="text-center text-slate-400 mt-4">
          Don't have an account? <Link to="/signup" className="text-emerald-400 hover:text-emerald-300">Sign up</Link>
        </p>
      </form>
    </div>
  )
}