import { Document, Schema, model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  imageUrl?: string;
  author: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
}

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'PostComment' }],
  },
  { timestamps: true }
);

export default model<IPost>('Post', PostSchema); 