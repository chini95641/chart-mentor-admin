import { Request, Response } from 'express';
import AdminPost from '../models/adminPost.model';
import mongoose from 'mongoose';

// Create a new post
export const createAdminPost = async (req: Request, res: Response) => {
  try {
    const { content, author } = req.body;
    const newPost = new AdminPost({
      content,
      author, // This should come from authenticated user
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
};

// Get all posts
export const getAdminPosts = async (req: Request, res: Response) => {
  try {
    const posts = await AdminPost.find().sort({ createdAt: -1 }).populate('author', 'name');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve posts', error });
  }
};

// Like/Unlike a post
export const likeAdminPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // This should come from authenticated user
    const post = await AdminPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update likes', error });
  }
};

// Add a comment to a post
export const addAdminComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user, text } = req.body; // User should come from authenticated user
    const post = await AdminPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = { user, text, createdAt: new Date() } as any;
    post.comments.push(newComment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

// Delete a comment from a post
export const deleteAdminComment = async (req: Request, res: Response) => {
  try {
    const { postId, commentId } = req.params;
    const post = await AdminPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const comment = post.comments.find(c => c.id === commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    post.comments = post.comments.filter(c => c.id !== commentId);

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error });
  }
}; 