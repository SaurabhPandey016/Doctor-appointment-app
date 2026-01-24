import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Signup() {
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/register', form)
      toast.success('Signup Successful')
      navigate('/login')
    } catch(error) {
      toast.error('Signup Failed', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input className="w-full border p-2 mb-2" placeholder="Name"
          onChange={e=>setForm({...form,name:e.target.value})} required />

        <input className="w-full border p-2 mb-2" placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})} required />

        <input className="w-full border p-2 mb-2" placeholder="Phone"
          onChange={e=>setForm({...form,phone:e.target.value})} required />

        <input className="w-full border p-2 mb-2" type="password" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})} required />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Signup
        </button>

        <p className="text-sm mt-3">
          Already registered? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  )
}