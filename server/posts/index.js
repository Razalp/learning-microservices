import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Comment DB'))
    .catch(err => console.error('Could not connect to DB:', err));

// Comment schema and model
const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

// Routes
app.post('/comments', async (req, res) => {
    const { postId, text } = req.body;

    try {
        const comment = new Comment({ postId, text });
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/comments/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.send(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Starting the server
app.listen(4000, () => console.log('Comment service running on port 4000'));
