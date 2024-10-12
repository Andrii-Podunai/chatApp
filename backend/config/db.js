import mongoose from 'mongoose'; // MongoDB ODM for Node.js
import dotenv from 'dotenv';

dotenv.config(); 

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, // Use the new server discovery and monitoring engine
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
