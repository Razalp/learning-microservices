import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/posts', postRoutes);

// MongoDB connection and server startup
mongoose.connect('mongodb://localhost:27017/posts', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to Post DB');
        app.listen(PORT, () => console.log(`Post service running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Could not connect to DB:', err);
        process.exit(1); // Exit if the database connection fails
    });
