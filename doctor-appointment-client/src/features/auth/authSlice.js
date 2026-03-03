// Import Redux toolkit functions for state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'                 // HTTP client for API requests

/**
 * Async thunk for user login
 * Makes POST request to backend login endpoint
 * Returns user data and authentication token on success
 * On error, returns error message from server
 */
export const loginUser = createAsyncThunk(
  'auth/login',                           // Unique action type
  async (data, thunkAPI) => {             // data = { email, password }
    try {
      // Send login request to backend API
      const res = await axios.post(
        'https://doctor-appointment-app-p51b.onrender.com/api/auth/login',
        data
      )
      // Return successful response (token and user)
      return res.data
    } catch (err) {
      // Return error response data for error handling
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

// Create auth slice with initial state from localStorage
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Retrieve user from localStorage if exists, otherwise null
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    // Retrieve token from localStorage if exists, otherwise null
    token: localStorage.getItem('token') || null
  },
  reducers: {
    // Logout action: clear auth state and localStorage
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    // Update user profile in state and localStorage
    updateUserProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  extraReducers: (builder) => {
    // Handle successful login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // Extract user and token from response
      state.user = action.payload.user
      state.token = action.payload.token
      // Persist token and user to localStorage for session management
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    })
  }
})

// Export action creators
export const { logout, updateUserProfile } = authSlice.actions
// Export reducer as default
export default authSlice.reducer
