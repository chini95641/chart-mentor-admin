import { Request, Response } from 'express';
import Post from '../models/post.model';
import { sendResponse } from '../utils/response.utils';
import { IUser } from '../types/user.types';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, 'Unauthorized');
    }
    const post = new Post({ ...req.body, author: req.user._id });
    await post.save();
    sendResponse(res, 201, 'Post created successfully', post);
  } catch (error: any) {
    sendResponse(res, 500, 'Internal Server Error', error.message);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate('author', 'name').populate('comments');
    sendResponse(res, 200, 'Posts retrieved successfully', posts);
  } catch (error: any) {
    sendResponse(res, 500, 'Internal Server Error', error.message);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name',
        },
      });
    if (!post) {
      return sendResponse(res, 404, 'Post not found');
    }
    sendResponse(res, 200, 'Post retrieved successfully', post);
  } catch (error: any) {
    sendResponse(res, 500, 'Internal Server Error', error.message);
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, 'Unauthorized');
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return sendResponse(res, 404, 'Post not found');
    }

    const userId = req.user._id;
    // @ts-ignore
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // @ts-ignore
      post.likes.pull(userId);
    } else {
      // @ts-ignore
      post.likes.push(userId);
    }

    await post.save();
    sendResponse(res, 200, 'Post liked successfully', post);
  } catch (error: any) {
    sendResponse(res, 500, 'Internal Server Error', error.message);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, 'Unauthorized');
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return sendResponse(res, 404, 'Post not found');
    }

    // @ts-ignore
    if (post.author.toString() !== req.user._id.toString()) {
      return sendResponse(res, 401, 'User not authorized');
    }
    await post.deleteOne();
    sendResponse(res, 200, 'Post removed');
  } catch (error: any) {
    sendResponse(res, 500, 'Internal Server Error', error.message);
  }
}; 