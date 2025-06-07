import { Document, Schema, model } from 'mongoose';

// Correcting the import and type usage based on user.model.ts structure
// Assuming IUser is the main export or we need to define it based on the model.
// For now, let's use a generic ObjectId reference as the exact IUser export is not confirmed.

interface IAdminComment extends Document {
  user: Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IAdminPost extends Document {
  content: string;
  author: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  comments: IAdminComment[];
  createdAt: Date;
  updatedAt: Date;
}

const AdminCommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const AdminPostSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [AdminCommentSchema],
  },
  { timestamps: true }
);

export default model<IAdminPost>('AdminPost', AdminPostSchema); 