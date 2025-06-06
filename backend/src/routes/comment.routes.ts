import express from 'express';
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComment,
} from '../controllers/comment.controller';
import { errorWrap } from '../utils/error.utils';
import verifyToken from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(createComment, 'Could not create comment')
);
router.get(
  '/',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(getComments, 'Could not get comments')
);
router.get(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(getCommentById, 'Could not get comment')
);
router.put(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(updateComment, 'Could not update comment')
);
router.delete(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(deleteComment, 'Could not delete comment')
);

export default router; 