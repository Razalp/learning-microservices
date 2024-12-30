import Comment from '../models/comment.js';

// Create a new comment
export const createComment = async (req, res) => {
    const { postId, text } = req.body;

    try {
        const comment = new Comment({ postId, text });
        await comment.save();
        res.status(201).send(comment); // Send the created comment back as the response
    } catch (error) {
        res.status(400).send(error.message); // Send error message in case of failure
    }
};

// Get comments for a specific post
export const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.send(comments); // Return the list of comments
    } catch (error) {
        res.status(500).send(error.message); // Send error message in case of failure
    }
};
