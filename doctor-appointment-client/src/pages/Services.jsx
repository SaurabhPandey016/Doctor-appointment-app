import { useState, useEffect, useRef } from 'react'
import { SPECIALTIES } from '@/lib/specialities'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Star, Calendar, Users, User } from 'lucide-react'

  export const mockDoctors = {
    'Cardiology': [
      { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', experience: 12, rating: 4.9, patients: 1850, description: 'Expert cardiologist specializing in preventive care', image: '/logo-single.png' },
      { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiology', experience: 8, rating: 4.7, patients: 1320, description: 'Interventional cardiology specialist', image: '/logo-single.png' },
      { id: 3, name: 'Dr. Patricia Lopez', specialty: 'Cardiology', experience: 14, rating: 4.8, patients: 2100, description: 'Heart failure and transplant specialist', image: '/logo-single.png' },
      { id: 4, name: 'Dr. David Kumar', specialty: 'Cardiology', experience: 10, rating: 4.6, patients: 1650, description: 'General cardiology and patient education', image: '/logo-single.png' },
    ],
    'General Medicine': [
      { id: 5, name: 'Dr. James Wilson', specialty: 'General Medicine', experience: 10, rating: 4.8, patients: 2340, description: 'Trusted primary care physician', image: '/logo-single.png' },
      { id: 6, name: 'Dr. Emily Davis', specialty: 'General Medicine', experience: 7, rating: 4.5, patients: 1560, description: 'Compassionate care for all ages', image: '/logo-single.png' },
      { id: 7, name: 'Dr. Robert Martinez', specialty: 'General Medicine', experience: 12, rating: 4.7, patients: 2050, description: 'Preventive medicine expert', image: '/logo-single.png' },
      { id: 8, name: 'Dr. Catherine Singh', specialty: 'General Medicine', experience: 9, rating: 4.6, patients: 1780, description: 'Evidence-based medical practice', image: '/logo-single.png' },
    ],
    'Dermatology': [
      { id: 9, name: 'Dr. Lisa Anderson', specialty: 'Dermatology', experience: 9, rating: 4.9, patients: 1420, description: 'Skin specialist and cosmetic dermatologist', image: '/logo-single.png' },
      { id: 10, name: 'Dr. Marc Thompson', specialty: 'Dermatology', experience: 11, rating: 4.8, patients: 1890, description: 'Acne and rosacea treatment expert', image: '/logo-single.png' },
      { id: 11, name: 'Dr. Jennifer Brown', specialty: 'Dermatology', experience: 8, rating: 4.6, patients: 1320, description: 'Laser treatments and aesthetics', image: '/logo-single.png' },
      { id: 12, name: 'Dr. Antonio Garcia', specialty: 'Dermatology', experience: 10, rating: 4.7, patients: 1650, description: 'Eczema and psoriasis specialist', image: '/logo-single.png' },
    ],
    'Neurology': [
      { id: 13, name: 'Dr. Robert Taylor', specialty: 'Neurology', experience: 15, rating: 4.9, patients: 2200, description: 'Experienced neurologist treating complex cases', image: '/logo-single.png' },
      { id: 14, name: 'Dr. Nancy White', specialty: 'Neurology', experience: 12, rating: 4.8, patients: 1920, description: 'Migraine and headache specialist', image: '/logo-single.png' },
      { id: 15, name: 'Dr. Kevin Lee', specialty: 'Neurology', experience: 10, rating: 4.7, patients: 1680, description: 'Stroke and neurological emergencies', image: '/logo-single.png' },
      { id: 16, name: 'Dr. Sophie Martin', specialty: 'Neurology', experience: 9, rating: 4.6, patients: 1450, description: 'Parkinson\'s and movement disorders', image: '/logo-single.png' },
    ],
    'Pediatrics': [
      { id: 17, name: 'Dr. Jennifer Martin', specialty: 'Pediatrics', experience: 11, rating: 4.8, patients: 2100, description: 'Child health specialist and immunization expert', image: '/logo-single.png' },
      { id: 18, name: 'Dr. William Jackson', specialty: 'Pediatrics', experience: 9, rating: 4.7, patients: 1680, description: 'Developmental pediatrician', image: '/logo-single.png' },
      { id: 19, name: 'Dr. Amanda Hayes', specialty: 'Pediatrics', experience: 8, rating: 4.6, patients: 1520, description: 'Allergy and asthma in children', image: '/logo-single.png' },
      { id: 20, name: 'Dr. Christopher Green', specialty: 'Pediatrics', experience: 10, rating: 4.8, patients: 1850, description: 'Newborn and infant care', image: '/logo-single.png' },
    ],
    'Orthopedics': [
      { id: 21, name: 'Dr. Richard Harris', specialty: 'Orthopedics', experience: 16, rating: 4.9, patients: 2400, description: 'Joint replacement and sports medicine', image: '/logo-single.png' },
      { id: 22, name: 'Dr. Michelle Young', specialty: 'Orthopedics', experience: 12, rating: 4.8, patients: 1950, description: 'Spine surgery specialist', image: '/logo-single.png' },
      { id: 23, name: 'Dr. Thomas Kelly', specialty: 'Orthopedics', experience: 10, rating: 4.7, patients: 1720, description: 'Fracture and trauma care', image: '/logo-single.png' },
      { id: 24, name: 'Dr. Rachel Adams', specialty: 'Orthopedics', experience: 9, rating: 4.6, patients: 1580, description: 'Arthroscopy and minimally invasive', image: '/logo-single.png' },
    ],
    'Endocrinology': [
      { id: 25, name: 'Dr. Richard Harris', specialty: 'Endocrinology', experience: 16, rating: 4.9, patients: 2400, description: 'Joint replacement and sports medicine', image: '/logo-single.png' },
      { id: 26, name: 'Dr. Lisa Anderson', specialty: 'Endocrinology', experience: 12, rating: 4.8, patients: 1950, description: 'Spine surgery specialist', image: '/logo-single.png' },
      { id: 27, name: 'Dr. Thomas Kelly', specialty: 'Endocrinology', experience: 10, rating: 4.7, patients: 1720, description: 'Fracture and trauma care', image: '/logo-single.png' },
      { id: 28, name: 'Dr. Rachel Adams', specialty: 'Endocrinology', experience: 9, rating: 4.6, patients: 1580, description: 'Arthroscopy and minimally invasive', image: '/logo-single.png' },
    ],
    'Ophthalmology': [
      { id: 29, name: 'Dr. Richard Harris', specialty: 'Ophthalmology', experience: 16, rating: 4.9, patients: 2400, description: 'Joint replacement and sports medicine', image: '/logo-single.png' },
      { id: 30, name: 'Dr. Michelle Young', specialty: 'Ophthalmology', experience: 12, rating: 4.8, patients: 1950, description: 'Spine surgery specialist', image: '/logo-single.png' },
      { id: 31, name: 'Dr. Lisa Anderson', specialty: 'Ophthalmology', experience: 10, rating: 4.7, patients: 1720, description: 'Fracture and trauma care', image: '/logo-single.png' },
      { id: 32, name: 'Dr. Rachel Adams', specialty: 'Ophthalmology', experience: 9, rating: 4.6, patients: 1580, description: 'Arthroscopy and minimally invasive', image: '/logo-single.png' },
    ],
    'Gastroenterology': [
      { id: 33, name: 'Dr. Richard Harris', specialty: 'Gastroenterology', experience: 16, rating: 4.9, patients: 2400, description: 'Joint replacement and sports medicine', image: '/logo-single.png' },
      { id: 34, name: 'Dr. Michelle Young', specialty: 'Gastroenterology', experience: 12, rating: 4.8, patients: 1950, description: 'Spine surgery specialist', image: '/logo-single.png' },
      { id: 35, name: 'Dr. Lisa Anderson', specialty: 'Gastroenterology', experience: 10, rating: 4.7, patients: 1720, description: 'Fracture and trauma care', image: '/logo-single.png' },
      { id: 36, name: 'Dr. Rachel Adams', specialty: 'Gastroenterology', experience: 9, rating: 4.6, patients: 1580, description: 'Arthroscopy and minimally invasive', image: '/logo-single.png' },
    ],
    'Obstetrics & Gynecology': [
      { id: 37, name: 'Dr. Richard Harris', specialty: 'Obstetrics & Gynecology', experience: 16, rating: 4.9, patients: 2400, description: 'Joint replacement and sports medicine', image: '/logo-single.png' },
      { id: 38, name: 'Dr. Michelle Young', specialty: 'Obstetrics & Gynecology', experience: 12, rating: 4.8, patients: 1950, description: 'Spine surgery specialist', image: '/logo-single.png' },
      { id: 39, name: 'Dr. Thomas Kelly', specialty: 'Obstetrics & Gynecology', experience: 10, rating: 4.7, patients: 1720, description: 'Fracture and trauma care', image: '/logo-single.png' },
      { id: 40, name: 'Dr. Lisa Anderson', specialty: 'Obstetrics & Gynecology', experience: 9, rating: 4.6, patients: 1580, description: 'Arthroscopy and minimally invasive', image: '/logo-single.png' },
    ],
    'Oncology': [
      { id: 41, name: 'Dr. Lisa Anderson', specialty: 'Oncology', experience: 16, rating: 4.9, patients: 2400, description: 'Joint replacement and sports medicine', image: '/logo-single.png' },
      { id: 42, name: 'Dr. Michelle Young', specialty: 'Oncology', experience: 12, rating: 4.8, patients: 1950, description: 'Spine surgery specialist', image: '/logo-single.png' },
      { id: 43, name: 'Dr. Thomas Kelly', specialty: 'Oncology', experience: 10, rating: 4.7, patients: 1720, description: 'Fracture and trauma care', image: '/logo-single.png' },
      { id: 44, name: 'Dr. Rachel Adams', specialty: 'Oncology', experience: 9, rating: 4.6, patients: 1580, description: 'Arthroscopy and minimally invasive', image: '/logo-single.png' },
    ],
    'Psychiatry': [
      { id: 45, name: 'Dr. Richard Harris', specialty: 'Psychiatry', experience: 16, rating: 4.9, patients: 2400, description: 'Joint replacement and sports medicine', image: '/logo-single.png' },
      { id: 46, name: 'Dr. Lisa Anderson', specialty: 'Psychiatry', experience: 12, rating: 4.8, patients: 1950, description: 'Spine surgery specialist', image: '/logo-single.png' },
      { id: 47, name: 'Dr. Thomas Kelly', specialty: 'Psychiatry', experience: 10, rating: 4.7, patients: 1720, description: 'Fracture and trauma care', image: '/logo-single.png' },
      { id: 48, name: 'Dr. Rachel Adams', specialty: 'Psychiatry', experience: 9, rating: 4.6, patients: 1580, description: 'Arthroscopy and minimally invasive', image: '/logo-single.png' },
    ],
  }

export default function Services() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)
  const doctorGridRef = useRef(null)



  useEffect(() => {
    if (selectedSpecialty) {
      setLoading(true)
      setTimeout(() => {
        setDoctors(mockDoctors[selectedSpecialty] || [])
        setLoading(false)
        // Scroll to doctor grid
        setTimeout(() => {
          doctorGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }, 400)
    }
  }, [selectedSpecialty])

  const handleBook = (doctor) => {
    if (!token) {
      toast.error('Please login to book an appointment')
      navigate('/login')
      return
    }
    navigate(`/book?doctorId=${doctor.id}&doctorName=${doctor.name}&specialty=${doctor.specialty}`)
  }

  const DoctorCard = ({ doctor }) => (
    <div className="group bg-gradient-to-br from-slate-900 to-slate-900/50 border border-emerald-900/20 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer">
      <div className="mb-4">

      <User className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform" />

        {/* <img 
          src="{doctor.imageUrl || '/logo-single.png'}"
          alt={<User className="h-8 w-8 text-emerald-400" />}
          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
        /> */}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1">{doctor.name}</h3>
      <p className="text-emerald-400 text-sm font-medium mb-3">{doctor.specialty}</p>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Experience:</span>
          <span className="text-white font-medium">{doctor.experience} years</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <Star className="h-4 w-4" />
            Rating:
          </span>
          <span className="text-yellow-400 font-medium">{doctor.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <Users className="h-4 w-4" />
            Patients:
          </span>
          <span className="text-white font-medium">{doctor.patients.toLocaleString()}</span>
        </div>
      </div>
      
      <p className="text-slate-400 text-sm mb-4">{doctor.description}</p>
      
      <button
        onClick={() => handleBook(doctor)}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Book Appointment
      </button>
    </div>
  )

  
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-emerald-900/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Doctor</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Connect with experienced healthcare professionals in your preferred specialty
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Specialty Selector */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Select a Specialty</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SPECIALTIES.slice(0, 12).map((specialty) => (
              <button
                key={specialty.name}
                onClick={() => setSelectedSpecialty(specialty.name)}
                className={`p-4 rounded-lg border-2 transition-all text-center group ${
                  selectedSpecialty === specialty.name
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'border-emerald-900/30 bg-slate-900/50 text-slate-400 hover:border-emerald-500/50 hover:bg-slate-800/50'
                }`}
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{specialty.icon}</div>
                <div className="text-sm font-semibold">{specialty.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        {selectedSpecialty && (
          <div ref={doctorGridRef} className="scroll-mt-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedSpecialty} Specialists
              </h2>
              <p className="text-slate-400">
                {doctors.length} qualified professionals available
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
                <p className="text-slate-400 mt-6 text-lg">Loading specialists...</p>
              </div>
            ) : doctors.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/30 rounded-lg border border-emerald-900/20">
                <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No doctors available in this specialty</p>
              </div>
            )}
          </div>
        )}

        {!selectedSpecialty && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h3 className="text-2xl font-semibold text-white mb-2">Start your search</h3>
            <p className="text-slate-400">Select a specialty above to view available doctors</p>
          </div>
        )}
      </div>
    </main>
  )
}

