import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctorType: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    comments: {
      type: String
    },
    report: {
      type: String
    }
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', appointmentSchema)
