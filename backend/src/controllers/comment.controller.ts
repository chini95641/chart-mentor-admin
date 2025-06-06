import { Request, Response } from 'express';
import Comment, { IComment } from '../models/comment.model';
import { sendResponse } from '../utils/response.utils';

export const createComment = async (req: Request, res: Response) => {
  const { text } = req.body;
  const comment: IComment = new Comment({ text });
  await comment.save();
  sendResponse(res, 201, 'Comment created successfully', comment);
};

export const getComments = async (req: Request, res: Response) => {
  const comments = await Comment.find();
  sendResponse(res, 200, 'Comments retrieved successfully', comments);
};

export const getCommentById = async (req: Request, res: Response) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return sendResponse(res, 404, 'Comment not found');
  }
  sendResponse(res, 200, 'Comment retrieved successfully', comment);
};

export const updateComment = async (req: Request, res: Response) => {
  const { text } = req.body;
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { text },
    { new: true }
  );
  if (!comment) {
    return sendResponse(res, 404, 'Comment not found');
  }
  sendResponse(res, 200, 'Comment updated successfully', comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) {
    return sendResponse(res, 404, 'Comment not found');
  }
  sendResponse(res, 200, 'Comment deleted successfully');
}; 