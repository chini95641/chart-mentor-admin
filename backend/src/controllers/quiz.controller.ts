import { Request, Response } from 'express';
import { QuizModel } from '../models/quiz.model';
import { sendResponse } from '../utils/response.utils';

export const createQuiz = async (req: Request, res: Response) => {
  const { question, video, options } = req.body;
  const isManual = !options || options.length === 0;
  const quiz = new QuizModel({ question, video, options, isManual });
  await quiz.save();
  sendResponse(res, 201, 'Quiz created successfully', quiz);
};

export const getQuizzes = async (req: Request, res: Response) => {
  const quizzes = await QuizModel.find().sort({ createdAt: -1 });
  sendResponse(res, 200, 'Quizzes retrieved successfully', quizzes);
};

export const getQuizById = async (req: Request, res: Response) => {
  const quiz = await QuizModel.findById(req.params.id);
  if (!quiz) {
    return sendResponse(res, 404, 'Quiz not found');
  }
  sendResponse(res, 200, 'Quiz retrieved successfully', quiz);
};

export const updateQuiz = async (req: Request, res: Response) => {
  const { question, video, options } = req.body;
  const isManual = !options || options.length === 0;
  const quiz = await QuizModel.findByIdAndUpdate(
    req.params.id,
    { question, video, options, isManual },
    { new: true }
  );
  if (!quiz) {
    return sendResponse(res, 404, 'Quiz not found');
  }
  sendResponse(res, 200, 'Quiz updated successfully', quiz);
};

export const deleteQuiz = async (req: Request, res: Response) => {
  const quiz = await QuizModel.findByIdAndDelete(req.params.id);

  if (!quiz) {
    return sendResponse(res, 404, 'Quiz not found');
  }

  sendResponse(res, 200, 'Quiz deleted successfully');
}; 