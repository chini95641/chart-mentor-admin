import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import { sendResponse } from '../utils/response.utils';
import { RequestError } from '../utils/globalErrorHandler';
import { handleGetStock, handleSaveStock } from '../services/stock.services';

export const getStock = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  try {
    const stock = await handleGetStock(session);
    return sendResponse(res, 200, 'Get Stock', stock);
  } catch (error) {
    throw new RequestError(`Error getting stock: ${error}`, 500);
  }
};

export const saveStock = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;
  try {
    const stock = await handleSaveStock(req.body, session);
    return sendResponse(res, 201, 'Stock saved successfully', stock);
  } catch (error) {
    throw new RequestError(`Error saving stock: ${error}`, 500);
  }
}; 