// Import JWT for token verification
import jwt from 'jsonwebtoken'

/**
 * Authentication Middleware
 * Protects routes by verifying JWT tokens in Authorization header
 * Format: Authorization: Bearer <token>
 */
export const protect = (req, res, next) => {
  // Extract token from Authorization header (format: "Bearer <token>")
  const token = req.headers.authorization?.split(' ')[1]
  
  // Return 401 if no token is provided
  if (!token) return res.status(401).json('Unauthorized')

  // Verify and decode JWT token using secret key from environment
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
  // Attach user ID to request object for use in protected route handlers
  req.userId = decoded.id
  req.user = { id: decoded.id }
  
  // Continue to next middleware/route handler
  next()
}

// Export alias for protect middleware (alternative naming convention)
export const authMiddleware = protect