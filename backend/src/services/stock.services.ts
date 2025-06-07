import { ClientSession } from 'mongoose';
import { Stock, StockModel } from '../models/stock.model';

export const handleGetStock = async (session: ClientSession) => {
  // There should only be one stock document
  const stock = await StockModel.findOne().session(session);
  return stock;
};

export const handleSaveStock = async (
  stockData: Partial<Stock>,
  session: ClientSession
) => {
  // Upsert the single stock document
  const stock = await StockModel.findOneAndUpdate({}, stockData, {
    new: true,
    upsert: true,
  }).session(session);
  return stock;
}; 