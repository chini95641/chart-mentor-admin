import express from 'express';
import {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
} from '../controllers/stock.controller';
import { withTransaction } from '../utils/transactionHelper';

const router = express.Router();

router.get('/list', withTransaction(getStocks));
router.post('/', withTransaction(createStock));
router.get('/:id', withTransaction(getStockById));
router.put('/:id', withTransaction(updateStock));
router.delete('/:id', withTransaction(deleteStock));

export default router; 