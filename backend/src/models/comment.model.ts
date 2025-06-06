import { Document, Schema, model } from 'mongoose';

export interface IComment extends Document {
  text: string;
}

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IComment>('Comment', CommentSchema); 