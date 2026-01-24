import express from 'express'
import Appointment from '../models/Appointment.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

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

export default router