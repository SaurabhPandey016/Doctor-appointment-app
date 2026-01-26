import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, MessageSquare, CheckCircle, User } from 'lucide-react'

export default function BookAppointment() {
  const [form, setForm] = useState({ doctorType: '', date: '', time: '', comments: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { token } = useSelector(state => state.auth)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const doctorName = searchParams.get('doctorName') || 'Doctor'
  const specialty = searchParams.get('specialty') || ''

  useEffect(() => {
    // Pre-fill specialty from URL params
    if (specialty) {
      setForm(prev => ({ ...prev, doctorType: specialty }))
    }
  }, [specialty])

  const submitHandler = async (e) => {
    e.preventDefault()
    
    if (!form.doctorType || !form.date || !form.time) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // Format data to match backend schema - comments field
      const appointmentData = {
        doctorType: form.doctorType,
        date: form.date,
        time: form.time,
        comments: form.concerns ? `${form.concerns}` : ''
      }

      await axios.post('http://localhost:5000/api/appointments', appointmentData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess(true)
      toast.success('Appointment Booked Successfully')
      setTimeout(() => {
        navigate('/appointments')
      }, 2000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to Book Appointment')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-md">
          <div className="border border-emerald-900/20 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/50 p-8 text-center shadow-xl shadow-emerald-500/10">
            <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Appointment Booked!</h2>
            <p className="text-slate-400 mb-6">
              Your appointment with {doctorName} has been successfully scheduled. You will be redirected to your appointments.
            </p>
            <a href="/appointments" className="text-emerald-400 hover:text-emerald-300 font-semibold">View My Appointments →</a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Book Your Appointment</h1>
          <div className="flex items-center gap-2 text-emerald-400">
            <User className="h-5 w-5" />
            <p className="text-lg">with <span className="font-semibold">{doctorName}</span></p>
          </div>
        </div>

        <form onSubmit={submitHandler} className="border border-emerald-900/20 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/50 p-8 shadow-xl shadow-emerald-500/5">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                <MessageSquare className="h-4 w-4 inline mr-2 text-emerald-400" />
                Medical Specialty/Type *
              </label>
              <input
                type="text"
                placeholder="e.g., Cardiology, General Medicine"
                value={form.doctorType}
                onChange={(e) => setForm({ ...form, doctorType: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-slate-800 transition-all placeholder-slate-500"
                required
              />
              <p className="text-slate-400 text-xs mt-1">Pre-filled from doctor selection. You can modify if needed.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  <Calendar className="h-4 w-4 inline mr-2 text-emerald-400" />
                  Appointment Date *
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-slate-800 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  <Clock className="h-4 w-4 inline mr-2 text-emerald-400" />
                  Appointment Time *
                </label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-slate-800 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                <MessageSquare className="h-4 w-4 inline mr-2 text-emerald-400" />
                Your Concerns / Notes
              </label>
              <textarea
                placeholder="Describe any symptoms or concerns (Optional)"
                value={form.concerns || ''}
                onChange={(e) => setForm({ ...form, concerns: e.target.value })}
                rows="4"
                className="w-full bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-slate-800 transition-all resize-none placeholder-slate-500"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Booking Appointment...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    Confirm Appointment
                  </>
                )}
              </button>
              <a
                href="/services"
                className="flex-1 border-2 border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-semibold py-3 px-4 rounded-lg transition-all text-center bg-slate-800/30 hover:bg-slate-800/50"
              >
                Back to Doctors
              </a>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
