import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
connectDB()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/reports', express.static(path.join(__dirname, 'reports')))

app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/services', serviceRoutes)

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
