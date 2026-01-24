import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

export default function Header({ toggle }) {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <FaBars onClick={toggle} className="cursor-pointer" />
      <div className="space-x-4">
        <Link to="/book">Book Appointment</Link>
        <Link to="/appointments">My Appointments</Link>
        <Link to="/services">Services</Link>
      </div>
    </div>
  )
}