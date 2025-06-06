import express from 'express';
import {
  createChartOfDay,
  getChartsOfDay,
  getChartOfDayById,
  updateChartOfDay,
  deleteChartOfDay,
} from '../controllers/chart_of_day.controller';
import { errorWrap } from '../utils/error.utils';
import verifyToken from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', errorWrap(getChartsOfDay, 'Could not get charts of the day'));

router.post(
  '/',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(createChartOfDay, 'Could not create chart of the day')
);

router.get(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(getChartOfDayById, 'Could not get chart of the day')
);

router.put(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(updateChartOfDay, 'Could not update chart of the day')
);

router.delete(
  '/:id',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(deleteChartOfDay, 'Could not delete chart of the day')
);

export default router; 