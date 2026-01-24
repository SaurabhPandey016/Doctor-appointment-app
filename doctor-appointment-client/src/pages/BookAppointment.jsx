import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function BookAppointment() {
  const [form, setForm] = useState({})
  const { token } = useSelector(state => state.auth)

  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/api/appointments', form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Appointment Booked')
  }

  return (
    <form onSubmit={submitHandler} className="p-6 max-w-md mx-auto">
      <input className="w-full border p-2 mb-2" placeholder="Doctor Type"
        onChange={e=>setForm({...form,doctorType:e.target.value})} />

      <input className="w-full border p-2 mb-2" type="date"
        onChange={e=>setForm({...form,date:e.target.value})} />

      <input className="w-full border p-2 mb-2" type="time"
        onChange={e=>setForm({...form,time:e.target.value})} />

      <textarea className="w-full border p-2 mb-2" placeholder="Comments"
        onChange={e=>setForm({...form,comments:e.target.value})} />

      <button className="bg-blue-600 text-white p-2 rounded w-full">
        Submit
      </button>
    </form>
  )
}
