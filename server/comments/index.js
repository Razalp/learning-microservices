import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/posts', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Post DB'))
    .catch(err => console.error('Could not connect to DB:', err));

// Post schema and model
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// Routes
app.post('/posts', async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = new Post({ title, content });
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Starting the server
app.listen(3001, () => console.log('Post service running on port 3001'));
