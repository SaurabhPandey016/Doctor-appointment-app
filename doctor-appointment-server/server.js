// Import required dependencies
import express from 'express'
import cors from 'cors'                          // Cross-Origin Resource Sharing
import dotenv from 'dotenv'                      // Environment variables
import connectDB from './config/db.js'           // MongoDB connection

// Import route handlers
import authRoutes from './routes/authRoutes.js'            // Authentication endpoints
import appointmentRoutes from './routes/appointmentRoutes.js' // Appointment management
import serviceRoutes from './routes/serviceRoutes.js'      // Service listing

// Import utilities for ESM support
import path from 'path'
import { fileURLToPath } from 'url'

// Import Swagger
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

// Load environment variables from .env file
dotenv.config()

// Connect to MongoDB database
connectDB()

// Initialize Express application
const app = express()

// Get current directory path (workaround for ESM modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Doctor Appointment API',
    version: '1.0.0',
    description: 'API for managing doctor appointments',
  },
  servers: [
    {
      url: 'https://doctor-appointment-app-p51b.onrender.com',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
}

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Paths to files containing OpenAPI definitions
}

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options)

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Enable CORS for frontend communication from any origin
app.use(cors())

// Middleware to parse incoming JSON request bodies
app.use(express.json())

// Serve static files (user uploaded documents and reports)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/reports', express.static(path.join(__dirname, 'reports')))

// Register API route handlers
app.use('/api/auth', authRoutes)              // User authentication endpoints
app.use('/api/appointments', appointmentRoutes) // Appointment CRUD operations
app.use('/api/services', serviceRoutes)       // Available services/specialties

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
