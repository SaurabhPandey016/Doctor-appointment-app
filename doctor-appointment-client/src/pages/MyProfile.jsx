import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUserProfile } from '@/features/auth/authSlice'
import { User, Mail, Phone, Upload, Edit2, Save, X, Camera } from 'lucide-react'

export default function MyProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user } = useSelector(state => state.auth)
  const fileInputRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePicture: null
  })

  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchUserProfile()
  }, [token, navigate])

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true)
      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProfileData(res.data)
      setEditData({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load profile')
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    // Validate file type
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
      toast.error('Only JPEG, PNG, and GIF files are allowed')
      return
    }

    try {
      setUploadingPhoto(true)
      const formData = new FormData()
      formData.append('profilePicture', file)

      const res = await axios.post('https://doctor-appointment-app-p51b.onrender.com/api/auth/upload-profile-picture', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setProfileData(prev => ({
        ...prev,
        profilePicture: res.data.profilePicture
      }))

      dispatch(updateUserProfile({
        ...user,
        profilePicture: res.data.profilePicture
      }))

      toast.success('Profile picture updated successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload profile picture')
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleSaveChanges = async () => {
    if (!editData.name || !editData.email || !editData.phone) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const res = await axios.put('https://doctor-appointment-app-p51b.onrender.com/api/auth/profile', editData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProfileData(res.data.user)
      dispatch(updateUserProfile(res.data.user))
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone
    })
    setIsEditing(false)
  }

  if (profileLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
          <p className="text-slate-400 ml-4">Loading profile...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-emerald-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">My Profile</h1>
          </div>
          <p className="text-slate-400">View and manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="border border-emerald-900/20 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/50 overflow-hidden shadow-xl shadow-emerald-500/5">
          
          {/* Profile Photo Section */}
          <div className="relative h-32 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-b border-emerald-900/20">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'linear-gradient(45deg, rgba(16,185,129,0.1) 0%, rgba(6,78,59,0.1) 100%)'
            }} />
          </div>

          {/* Profile Picture and Info Section */}
          <div className="px-6 md:px-8 py-8 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="relative group mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-emerald-500/50 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden shadow-xl shadow-emerald-500/20">
                    {profileData.profilePicture ? (
                      <img
                        src={`https://doctor-appointment-app-p51b.onrender.com${profileData.profilePicture}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-slate-600" />
                    )}
                  </div>

                  {/* Upload Photo Button */}
                  <button
                    onClick={handlePhotoClick}
                    disabled={uploadingPhoto}
                    className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 text-white rounded-full p-3 shadow-lg transition-all transform hover:scale-110"
                    title="Change profile picture"
                  >
                    {uploadingPhoto ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploadingPhoto}
                  />
                </div>

                <div className="text-center">
                  <p className="text-slate-400 text-sm">Click the camera icon to upload a profile picture</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="flex-1">
                {!isEditing ? (
                  <div className="space-y-6">
                    {/* Display Mode */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                      <div className="flex items-center gap-3 text-white text-lg font-medium">
                        <User className="h-5 w-5 text-emerald-400" />
                        <span>{profileData.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                      <div className="flex items-center gap-3 text-white text-lg font-medium">
                        <Mail className="h-5 w-5 text-emerald-400" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                      <div className="flex items-center gap-3 text-white text-lg font-medium">
                        <Phone className="h-5 w-5 text-emerald-400" />
                        <span>{profileData.phone}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-8 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30 w-full md:w-auto justify-center"
                    >
                      <Edit2 className="h-5 w-5" />
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Edit Mode */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        <User className="h-4 w-4 inline mr-2 text-emerald-400" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-slate-800 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        <Mail className="h-4 w-4 inline mr-2 text-emerald-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-slate-800 transition-all"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        <Phone className="h-4 w-4 inline mr-2 text-emerald-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:bg-slate-800 transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSaveChanges}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5" />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                      >
                        <X className="h-5 w-5" />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-8 border border-emerald-900/20 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-6 md:p-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-emerald-500 rounded" />
            Account Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-slate-400 text-sm">
            <div>
              <p className="text-slate-500 uppercase text-xs font-semibold mb-1">Member Since</p>
              <p className="text-white">
                {profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-slate-500 uppercase text-xs font-semibold mb-1">Last Updated</p>
              <p className="text-white">
                {profileData.updatedAt ? new Date(profileData.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
