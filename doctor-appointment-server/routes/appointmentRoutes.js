import express from 'express'
import Appointment from '../models/Appointment.js'
import { protect } from '../middlewares/authMiddleware.js'
import multer from 'multer'
import path from 'path'

const router = express.Router()

// Configure multer for report uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'reports/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'report-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|jpeg|jpg|png|doc|docx|txt/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    if (extname) {
      return cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
})

router.post('/', protect, async (req, res) => {
  const appointment = await Appointment.create({
    ...req.body,
    userId: req.userId
  })
  res.json(appointment)
})

router.get('/', protect, async (req, res) => {
  const appointments = await Appointment.find({ userId: req.userId })
  res.json(appointments)
})

router.delete('/:id', protect, async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id)
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' })
  }
  res.json({ message: 'Appointment cancelled' })
})

router.post('/:id/upload-report', protect, upload.single('report'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const appointment = await Appointment.findById(req.params.id)
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const reportObj = {
      filename: req.file.originalname,
      filepath: `/reports/${req.file.filename}`,
      uploadedAt: new Date()
    }

    appointment.reports.push(reportObj)
    await appointment.save()

    res.status(200).json({
      message: 'Report uploaded successfully',
      report: reportObj
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id/report/:reportIndex', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    appointment.reports.splice(req.params.reportIndex, 1)
    await appointment.save()

    res.json({ message: 'Report deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router