import { Request, Response } from 'express';
import Video from '../models/video';

export const createVideo = async (req: Request, res: Response) => {
  try {
    const { youtubeUrl, filePath } = req.body;

    if (!youtubeUrl && !filePath) {
      return res.status(400).send('Either youtubeUrl or a video file path is required.');
    }

    const video = new Video({
      youtubeUrl,
      filePath,
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error creating video', error });
  }
};

export const getVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error getting videos', error });
    }
};

export const getVideoById = async (req: Request, res: Response) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error getting video', error });
    }
};

export const updateVideo = async (req: Request, res: Response) => {
    try {
        const { youtubeUrl, filePath } = req.body;

        const video = await Video.findByIdAndUpdate(req.params.id, {
            youtubeUrl,
            filePath
        }, { new: true });

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error updating video', error });
    }
};

export const deleteVideo = async (req: Request, res: Response) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video', error });
    }
}; 