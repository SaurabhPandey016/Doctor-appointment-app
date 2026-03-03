// Import necessary utilities for route protection
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

/**
 * Protected Route Component
 * Wrapper for routes that require user authentication
 * Checks for valid JWT token in Redux auth state
 * Redirects to login if token is missing
 */
export default function ProtectedRoute() {
  // Get authentication token from Redux store
  const token = useSelector(state => state.auth.token)
  
  // If token exists, render child routes; otherwise redirect to login
  return token ? <Outlet /> : <Navigate to="/login" />
}
