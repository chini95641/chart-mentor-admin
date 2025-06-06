import { Request, Response } from 'express';
import Quote, { IQuote } from '../models/quote.model';
import { sendResponse } from '../utils/response.utils';

export const createQuote = async (req: Request, res: Response) => {
  const { text } = req.body;
  const quote: IQuote = new Quote({ text });
  await quote.save();
  sendResponse(res, 201, 'Quote created successfully', quote);
};

export const getQuotes = async (req: Request, res: Response) => {
  const quotes = await Quote.find();
  sendResponse(res, 200, 'Quotes retrieved successfully', quotes);
};

export const getQuoteById = async (req: Request, res: Response) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) {
    return sendResponse(res, 404, 'Quote not found');
  }
  sendResponse(res, 200, 'Quote retrieved successfully', quote);
};

export const updateQuote = async (req: Request, res: Response) => {
  const { text } = req.body;
  const quote = await Quote.findByIdAndUpdate(
    req.params.id,
    { text },
    { new: true }
  );
  if (!quote) {
    return sendResponse(res, 404, 'Quote not found');
  }
  sendResponse(res, 200, 'Quote updated successfully', quote);
};

export const deleteQuote = async (req: Request, res: Response) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);
  if (!quote) {
    return sendResponse(res, 404, 'Quote not found');
  }
  sendResponse(res, 200, 'Quote deleted successfully');
}; 