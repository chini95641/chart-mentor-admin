import { Router } from 'express';
import {
  createAdminPost,
  getAdminPosts,
  likeAdminPost,
  addAdminComment,
  deleteAdminComment,
} from '../controllers/adminPost.controller';
import verifyToken from '../middleware/auth.middleware';
import { admin } from '../middleware/admin.middleware';

const router = Router();

// TODO: Add admin authorization middleware
// @route   POST /api/admin-posts
// @desc    Create a post
// @access  Private/Admin
router.post('/', verifyToken, createAdminPost);

// @route   GET /api/admin-posts
// @desc    Get all posts
// @access  Public
router.get('/', getAdminPosts);

// @route   POST /api/admin-posts/:id/like
// @desc    Like a post
// @access  Private
router.post('/:id/like', verifyToken, likeAdminPost);

// @route   POST /api/admin-posts/:id/comments
// @desc    Comment on a post
// @access  Private
router.post('/:id/comments', verifyToken, addAdminComment);

// TODO: Add admin authorization middleware
// @route   DELETE /api/admin-posts/:postId/comments/:commentId
// @desc    Delete a comment
// @access  Private/Admin
router.delete('/:postId/comments/:commentId', verifyToken, deleteAdminComment);

export default router;
