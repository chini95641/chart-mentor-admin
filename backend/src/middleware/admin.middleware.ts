import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../utils/globalErrorHandler';
import { UserModel } from '../models/user.model';

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // req.userId should be attached from the verifyToken middleware
    const user = await UserModel.findById((req as any).userId);

    if (user && user.role === 'ADMIN') {
      next();
    } else {
      next(new AuthenticationError('Not authorized as an admin'));
    }
  } catch (error) {
    next(new AuthenticationError('Not authorized as an admin'));
  }
}; 