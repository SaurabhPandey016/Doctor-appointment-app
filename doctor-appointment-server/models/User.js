import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
phone: { type: String, required: true },
password: { type: String, required: true },
avatar: String,
profilePicture: {
  type: String,
  default: null
}
}, { timestamps: true })


export default mongoose.model('User', userSchema)