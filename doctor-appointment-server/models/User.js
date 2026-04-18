// Import Mongoose for database schema definition
import mongoose from 'mongoose'

// Define User schema for storing user account information
const userSchema = new mongoose.Schema({
name: { type: String, required: true },                    // User's full name
email: { type: String, required: true, unique: true },    // Email for login (must be unique)
phone: { type: String, required: true },                  // Contact phone number
password: { type: String, required: true },               // Hashed password for authentication
avatar: String,                                            // User's avatar image URL
profilePicture: {
  type: String,
  default: null                                            // User's profile picture URL
}
}, { timestamps: true })


// Export User model - createdAt and updatedAt timestamps are automatically managed
export default mongoose.model('User', userSchema)