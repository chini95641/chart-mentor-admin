import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Quiz extends Document {
  id: string;
  question: string;
  video: string;
  options: string[];
  isManual: boolean;
  createdAt: Date;
  updateAt: Date;
}

const QuizSchema = new Schema<Quiz>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    question: { type: String, required: true },
    video: { type: String, required: true },
    options: [{ type: String }],
    isManual: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const QuizModel = model<Quiz>('Quiz', QuizSchema); 