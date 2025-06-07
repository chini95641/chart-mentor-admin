import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import { sendResponse } from '../utils/response.utils';
import { RequestError } from '../utils/globalErrorHandler';
import {
  handleGetStocks,
  handleGetStockById,
  handleCreateStock,
  handleUpdateStock,
  handleDeleteStock,
} from '../services/stock.services';

export const getStocks = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  try {
    const stocks = await handleGetStocks(session);
    return sendResponse(res, 200, 'Stocks fetched successfully', stocks);
  } catch (error) {
    throw new RequestError(`Error getting stocks: ${error}`, 500);
  }
};

export const getStockById = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  try {
    const stock = await handleGetStockById(req.params.id, session);
    return sendResponse(res, 200, 'Stock fetched successfully', stock);
  } catch (error) {
    throw new RequestError(`Error getting stock: ${error}`, 500);
  }
};

export const createStock = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  try {
    const stock = await handleCreateStock(req.body, session);
    return sendResponse(res, 201, 'Stock created successfully', stock);
  } catch (error) {
    throw new RequestError(`Error creating stock: ${error}`, 500);
  }
};

export const updateStock = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  try {
    const stock = await handleUpdateStock(req.params.id, req.body, session);
    return sendResponse(res, 200, 'Stock updated successfully', stock);
  } catch (error) {
    throw new RequestError(`Error updating stock: ${error}`, 500);
  }
};

export const deleteStock = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  try {
    await handleDeleteStock(req.params.id, session);
    return sendResponse(res, 200, 'Stock deleted successfully', null);
  } catch (error) {
    throw new RequestError(`Error deleting stock: ${error}`, 500);
  }
};