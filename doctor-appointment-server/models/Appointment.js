// Import Mongoose for database operations
import mongoose from 'mongoose'

// Define Appointment schema for storing doctor appointment bookings
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',                              // Reference to User who booked appointment
      required: true
    },
    doctorType: {
      type: String,
      required: true                             // Specialty/type of doctor (e.g., Cardiologist)
    },
    date: {
      type: String,
      required: true                             // Appointment date
    },
    time: {
      type: String,
      required: true                             // Appointment time
    },
    comments: {
      type: String                               // Additional patient notes/comments
    },
    report: {
      type: String                               // Report document reference
    },
    reports: [{
      filename: String,                           // Uploaded report file name
      filepath: String,                           // Path to stored report file
      uploadedAt: {
        type: Date,
        default: Date.now                         // Timestamp when report was uploaded
      }
    }]
  },
  { timestamps: true }
)

// Export Appointment model with automatic timestamps (createdAt, updatedAt)
export default mongoose.model('Appointment', appointmentSchema)
