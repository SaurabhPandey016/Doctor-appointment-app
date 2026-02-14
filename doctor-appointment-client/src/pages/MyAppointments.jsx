import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Calendar, Trash2, User, Clock, MessageSquare, Upload, Download, X } from 'lucide-react'

export default function MyAppointments() {
  const { token } = useSelector(state => state.auth)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadingId, setUploadingId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const fileInputRef = useRef({})

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('https://doctor-appointment-app-p51b.onrender.com/api/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setAppointments(res.data)
      } catch (error) {
        toast.error('Failed to load appointments')
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [token])

  const cancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return

    try {
      await axios.delete(`https://doctor-appointment-app-p51b.onrender.com/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointments(appointments.filter(a => a._id !== id))
      toast.success('Appointment cancelled successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment')
    }
  }

  const handleReportUpload = async (appointmentId, file) => {
    if (!file) return

    if (file.size > 15 * 1024 * 1024) {
      toast.error('File size must be less than 15MB')
      return
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, JPEG, PNG, DOC, DOCX, and TXT files are allowed')
      return
    }

    try {
      setUploadingId(appointmentId)
      const formData = new FormData()
      formData.append('report', file)

      const res = await axios.post(`https://doctor-appointment-app-p51b.onrender.com/api/appointments/${appointmentId}/upload-report`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setAppointments(appointments.map(apt => {
        if (apt._id === appointmentId) {
          return { ...apt, reports: [...(apt.reports || []), res.data.report] }
        }
        return apt
      }))

      toast.success('Report uploaded successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload report')
    } finally {
      setUploadingId(null)
    }
  }

  const deleteReport = async (appointmentId, reportIndex) => {
    if (!window.confirm('Delete this report?')) return

    try {
      await axios.delete(`https://doctor-appointment-app-p51b.onrender.com/api/appointments/${appointmentId}/report/${reportIndex}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setAppointments(appointments.map(apt => {
        if (apt._id === appointmentId) {
          const newReports = apt.reports.filter((_, i) => i !== reportIndex)
          return { ...apt, reports: newReports }
        }
        return apt
      }))

      toast.success('Report deleted')
    } catch (error) {
      toast.error('Failed to delete report')
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">My Appointments</h1>
          </div>
          <p className="text-slate-400">View and manage your scheduled consultations</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
            <p className="text-slate-400 mt-4">Loading appointments...</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="border border-emerald-900/20 rounded-lg bg-slate-900/50 p-6 hover:border-emerald-700/40 transition-all"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                          <User className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{appointment.doctorType || 'Appointment'}</h3>
                          <p className="text-sm text-slate-400">Doctor Consultation</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span>{appointment.date || 'TBD'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="h-4 w-4 text-emerald-400" />
                          <span>{appointment.time || 'TBD'}</span>
                        </div>
                        {appointment.comments && (
                          <div className="flex items-center gap-2 text-slate-400">
                            <MessageSquare className="h-4 w-4 text-emerald-400" />
                            <span className="truncate">{appointment.comments}</span>
                          </div>
                        )}
                      </div>

                      {appointment.comments && (
                        <div className="mt-3 p-3 bg-slate-800/50 rounded border border-slate-700/50">
                          <p className="text-sm text-slate-400"><strong>Notes:</strong> {appointment.comments}</p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => cancelAppointment(appointment._id)}
                      className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg transition-all font-medium whitespace-nowrap"
                    >
                      <Trash2 className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>

                  {/* Report Section */}
                  <div className="border-t border-slate-700/50 pt-4">
                    <button
                      onClick={() => setExpandedId(expandedId === appointment._id ? null : appointment._id)}
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      {appointment.reports?.length ? `Reports (${appointment.reports.length})` : 'Upload Report'}
                    </button>

                    {expandedId === appointment._id && (
                      <div className="mt-4 space-y-3">
                        {/* Upload Button */}
                        <div>
                          <input
                            ref={el => fileInputRef.current[appointment._id] = el}
                            type="file"
                            onChange={(e) => handleReportUpload(appointment._id, e.target.files?.[0])}
                            className="hidden"
                            accept=".pdf,.jpeg,.jpg,.png,.doc,.docx,.txt"
                            disabled={uploadingId === appointment._id}
                          />
                          <button
                            onClick={() => fileInputRef.current[appointment._id]?.click()}
                            disabled={uploadingId === appointment._id}
                            className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 disabled:bg-emerald-700 text-emerald-400 px-3 py-2 rounded text-sm transition-all w-full justify-center"
                          >
                            {uploadingId === appointment._id ? (
                              <>
                                <div className="animate-spin h-4 w-4 border-2 border-emerald-400 border-t-transparent rounded-full" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4" />
                                Choose File (Max 15MB)
                              </>
                            )}
                          </button>
                        </div>

                        {/* Reports List */}
                        {appointment.reports && appointment.reports.length > 0 && (
                          <div className="space-y-2">
                            {appointment.reports.map((report, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-700/50">
                                <a
                                  href={`http://localhost:5000${report.filepath}`}
                                  download
                                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm flex-1"
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="truncate">{report.filename}</span>
                                </a>
                                <button
                                  onClick={() => deleteReport(appointment._id, idx)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No appointments scheduled
            </h3>
            <p className="text-slate-400 mb-6">
              You don't have any appointments yet. Browse our doctors and book your first consultation.
            </p>
            <a
              href="/services"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Find Doctors
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
