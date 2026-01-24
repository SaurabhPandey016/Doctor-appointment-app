import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function MyAppointments() {
  const { token } = useSelector(state => state.auth)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAppointments(res.data))
  }, [])

  return (
    <div className="p-6 grid md:grid-cols-3 gap-4">
      {appointments.map(a => (
        <div key={a._id} className="border p-4 rounded shadow">
          <h3 className="font-bold">{a.doctorType}</h3>
          <p>{a.date} {a.time}</p>
        </div>
      ))}
    </div>
  )
}
