import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).json({ msg: 'User exists' })

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword
  })

  res.status(201).json(user)
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

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

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { name, email, phone } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if email already exists for another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' })
      }
    }

    // Update fields
    if (name) user.name = name
    if (email) user.email = email
    if (phone) user.phone = phone

    // Update profile picture if file was uploaded
    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`
    }

    await user.save()

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

export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const userId = req.user.id
    const user = await User.findById(userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.profilePicture = `/uploads/${req.file.filename}`
    await user.save()

    res.status(200).json({
      message: 'Profile picture uploaded successfully',
      profilePicture: user.profilePicture
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
