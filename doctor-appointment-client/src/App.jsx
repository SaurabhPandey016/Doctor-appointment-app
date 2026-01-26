import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Services from './pages/Services'
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route element={<ProtectedRoute />}>

              <Route path='/book' element={<BookAppointment />} />
              <Route path='/appointments' element={<MyAppointments />} />
              <Route path='/profile' element={<MyProfile />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}