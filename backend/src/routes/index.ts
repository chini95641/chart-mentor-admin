import express from 'express';
import authRoutes from './auth.routes';
import uploadRoutes from './upload.routes';
import quoteRoutes from './quote.routes';
import commentRoutes from './comment.routes';
import chartOfDayRoutes from './chart_of_day.routes';
import videoRoutes from './video';
import stockRoutes from './stock.routes';
import quizRoutes from './quiz.routes';
import adminPostRoutes from './adminPost.routes';
import { sendResponse } from '../utils/response.utils';

const router = express.Router();

router.get('/', (req, res) => sendResponse(res, 200, `API is running`));
router.use('/api/auth', authRoutes);
router.use('/api/upload', uploadRoutes);
router.use('/api/quotes', quoteRoutes);
router.use('/api/comments', commentRoutes);
router.use('/api/charts', chartOfDayRoutes);
router.use('/api/videos', videoRoutes);
router.use('/api/stocks', stockRoutes);
router.use('/api/quizzes', quizRoutes);
router.use('/api/admin-posts', adminPostRoutes);
export default router;
