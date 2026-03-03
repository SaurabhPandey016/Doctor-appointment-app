// Import React and ReactDOM for application entry point
import React from 'react'
import ReactDOM from 'react-dom/client'

// Import Redux Provider and store for state management
import { Provider } from 'react-redux'
import { store } from './app/store'

// Import main App component and global styles
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'  // Notification library styles

// Render application with Redux store provider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
