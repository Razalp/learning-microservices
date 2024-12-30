import express from 'express';
import { createComment, getCommentsByPostId } from '../controllers/commentController.js';

const router = express.Router();

// Route for creating a new comment
router.post('/', createComment);

// Route for getting comments by post ID
router.get('/:postId', getCommentsByPostId);

export default router;
