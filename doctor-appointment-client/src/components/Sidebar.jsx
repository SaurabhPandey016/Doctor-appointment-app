import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Sidebar({ open }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className={`bg-gray-800 text-white w-64 p-4 ${open ? 'block' : 'hidden'}`}>
      <p className="font-bold mb-4">Patient</p>
      <button onClick={logoutHandler} className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </div>
  )
}