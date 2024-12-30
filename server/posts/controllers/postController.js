import { Post } from '../models/post.js';

export const createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = new Post({ title, content });
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
