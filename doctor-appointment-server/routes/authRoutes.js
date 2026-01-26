import express from 'express'
import { registerUser, loginUser, getUserProfile, updateUserProfile, uploadProfilePicture } from '../controllers/authController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import multer from 'multer'
import path from 'path'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'))
    }
  }
})

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authMiddleware, getUserProfile)
router.put('/profile', authMiddleware, upload.single('profilePicture'), updateUserProfile)
router.post('/upload-profile-picture', authMiddleware, upload.single('profilePicture'), uploadProfilePicture)

export default router
