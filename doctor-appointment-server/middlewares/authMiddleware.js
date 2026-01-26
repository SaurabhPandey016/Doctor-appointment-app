import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json('Unauthorized')

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.userId = decoded.id
  req.user = { id: decoded.id }
  next()
}

export const authMiddleware = protect