// Import Redux Toolkit's store configuration
import { configureStore } from '@reduxjs/toolkit'
// Import authentication reducer
import authReducer from '../features/auth/authSlice'

// Configure and export Redux store
// Combines all reducers (auth, etc.) into single central store
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})
