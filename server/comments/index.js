import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import commentRoutes from './routes/commentRoutes.js'; // Import routes for comments

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/comments', commentRoutes); // Use the comment routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to Comment DB');
        app.listen(PORT, () => console.log(`Comment service running on port ${PORT}`)); // Start the server
    })
    .catch(err => {
        console.error('Could not connect to DB:', err);
        process.exit(1); // Exit if the database connection fails
    });
