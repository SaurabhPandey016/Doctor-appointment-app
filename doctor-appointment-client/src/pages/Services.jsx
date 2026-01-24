import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data))
  }, [])

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {services.map((s, i) => (
        <div key={i} className="p-4 bg-white shadow rounded">
          {s.name}
        </div>
      ))}
    </div>
  )
}
