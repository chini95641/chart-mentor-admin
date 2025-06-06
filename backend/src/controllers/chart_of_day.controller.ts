import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import ChartOfDay from '../models/chart_of_day.model';
import { sendResponse } from '../utils/response.utils';

export const createChartOfDay = async (req: Request, res: Response) => {
  const { imageUrl, description } = req.body;
  const chart = new ChartOfDay({ imageUrl, description });
  await chart.save();
  sendResponse(res, 201, 'Chart of the Day created successfully', chart);
};

export const getChartsOfDay = async (req: Request, res: Response) => {
  const charts = await ChartOfDay.find().sort({ createdAt: -1 });
  sendResponse(res, 200, 'Charts of the Day retrieved successfully', charts);
};

export const getChartOfDayById = async (req: Request, res: Response) => {
  const chart = await ChartOfDay.findById(req.params.id);
  if (!chart) {
    return sendResponse(res, 404, 'Chart not found');
  }
  sendResponse(res, 200, 'Chart retrieved successfully', chart);
};

export const updateChartOfDay = async (req: Request, res: Response) => {
  const { imageUrl, description } = req.body;
  const chart = await ChartOfDay.findByIdAndUpdate(
    req.params.id,
    { imageUrl, description },
    { new: true }
  );
  if (!chart) {
    return sendResponse(res, 404, 'Chart not found');
  }
  sendResponse(res, 200, 'Chart updated successfully', chart);
};

export const deleteChartOfDay = async (req: Request, res: Response) => {
  const chart = await ChartOfDay.findById(req.params.id);

  if (!chart) {
    return sendResponse(res, 404, 'Chart not found');
  }

  // Delete the image file
  if (chart.imageUrl) {
    const filename = path.basename(chart.imageUrl);
    const imagePath = path.join(__dirname, '..', '..', 'uploads', filename);
    
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Failed to delete image: ${imagePath}`, err);
        // We can choose to not block the DB deletion even if file deletion fails
      }
    });
  }
  
  await ChartOfDay.findByIdAndDelete(req.params.id);
  
  sendResponse(res, 200, 'Chart deleted successfully');
}; 