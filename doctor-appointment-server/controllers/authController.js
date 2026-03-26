// Import required dependencies
import User from '../models/User.js'               // User database model
import bcrypt from 'bcryptjs'                      // Password encryption
import jwt from 'jsonwebtoken'                     // JWT token generation

/**
 * User Registration Controller
 * Creates new user account with hashed password
 * Returns status 400 if email already exists
 */
export const registerUser = async (req, res) => {
  // Extract user registration data from request body
  const { name, email, phone, password } = req.body

  // Check if user with this email already exists
  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).json({ msg: 'User exists' })

  // Hash password with salt rounds (10) for security
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user in database with hashed password
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword
  })

  // Return created user (status 201: Created)
  res.status(201).json(user)
}

/**
 * User Login Controller
 * Verifies credentials and returns JWT token for session management
 * Token expires after 24 hours
 */
export const loginUser = async (req, res) => {
  try {
    // Extract login credentials from request
    const { email, password } = req.body

    // Validate that both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    // Find user by email in database
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' })
    }

    // Generate JWT token valid for 1 day
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    // Return token and user data (excluding password)
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture
      }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Get User Profile Controller
 * Retrieves authenticated user's profile data
 * Password field is excluded from response
 */
export const getUserProfile = async (req, res) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user.id
    
    // Fetch user from database, excluding password field
    const user = await User.findById(userId).select('-password')
    
    // Return 404 if user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return user profile data
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Update User Profile Controller
 * Updates user's name, email, phone, and uploads profile picture
 * Validates email uniqueness before updating
 */
export const updateUserProfile = async (req, res) => {
  try {
    // Get authenticated user ID
    const userId = req.user.id
    // Extract fields to update from request body
    const { name, email, phone } = req.body

    // Find user in database
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Prevent duplicate emails - check if new email is already taken by another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' })
      }
    }

    // Update user fields if provided
    if (name) user.name = name
    if (email) user.email = email
    if (phone) user.phone = phone

    // Save profile picture if file was uploaded
    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`
    }

    // Save updated user to database
    await user.save()

    // Return updated user data
    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture
      }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Upload Profile Picture Controller
 * Saves user's profile picture to uploads directory
 * Updates user document with picture path
 */
export const uploadProfilePicture = async (req, res) => {
  try {
    // Validate that file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Get authenticated user's ID
    const userId = req.user.id
    const user = await User.findById(userId)
    
    // Return 404 if user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update user's profile picture path
    user.profilePicture = `/uploads/${req.file.filename}`
    await user.save()

    // Return success response with picture path
    res.status(200).json({
      message: 'Profile picture uploaded successfully',
      profilePicture: user.profilePicture
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
