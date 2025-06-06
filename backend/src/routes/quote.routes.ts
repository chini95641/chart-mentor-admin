import express from 'express';
import {
  createQuote,
  deleteQuote,
  getQuoteById,
  getQuotes,
  updateQuote,
} from '../controllers/quote.controller';
import { errorWrap } from '../utils/error.utils';
import verifyToken from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(createQuote, 'Could not create quote')
);
router.get(
  '/',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(getQuotes, 'Could not get quotes')
);
router.get(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(getQuoteById, 'Could not get quote')
);
router.put(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(updateQuote, 'Could not update quote')
);
router.delete(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(deleteQuote, 'Could not delete quote')
);

export default router; 