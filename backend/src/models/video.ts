import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  youtubeUrl?: string;
  filePath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema: Schema = new Schema(
  {
    youtubeUrl: { type: String },
    filePath: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IVideo>('Video', videoSchema); 