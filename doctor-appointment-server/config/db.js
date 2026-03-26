// Import Mongoose for database connectivity
import mongoose from 'mongoose'


// Initialize and connect to MongoDB database
// Uses MONGO_URI from environment variables
const connectDB = async () => {

    try {
        // Attempt to connect to MongoDB using the URI from .env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        // Log connection errors for debugging
        console.error('MongoDB connection error:', error);
    }
}


// Export connection function for use in main server file
export default connectDB