import express from 'express';
import { getStock, saveStock } from '../controllers/stock.controller';
import { withTransaction } from '../utils/transactionHelper';

const router = express.Router();

router.get('/', withTransaction(getStock));
router.post('/', withTransaction(saveStock));

export default router; 