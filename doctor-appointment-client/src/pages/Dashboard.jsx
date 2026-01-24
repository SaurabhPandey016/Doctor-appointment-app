import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} />
      <div className="flex-1">
        <Header toggle={() => setOpen(!open)} />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        </div>
      </div>
    </div>
  )
}
