import { ClientSession } from 'mongoose';
import { Stock, StockModel } from '../models/stock.model';

export const handleGetStocks = async (session: ClientSession) => {
  const stocks = await StockModel.find().session(session);
  return stocks;
};

export const handleGetStockById = async (id: string, session: ClientSession) => {
  const stock = await StockModel.findById(id).session(session);
  return stock;
};

export const handleCreateStock = async (stockData: Partial<Stock>, session: ClientSession) => {
  const stock = await StockModel.create([stockData], { session });
  return stock[0];
};

export const handleUpdateStock = async (
  id: string,
  stockData: Partial<Stock>,
  session: ClientSession
) => {
  const stock = await StockModel.findByIdAndUpdate(id, stockData, { new: true }).session(session);
  return stock;
};

export const handleDeleteStock = async (id: string, session: ClientSession) => {
  const stock = await StockModel.findByIdAndDelete(id).session(session);
  return stock;
}; 