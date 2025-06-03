import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface User extends Document {
  id: string;
  avatar?: string;
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'LEADER' | 'MATERIAL' | 'TRAVEL' | 'COST';
  bio: string;
  createdAt: Date;
  updateAt: Date;
}

const UserSchema = new Schema<User>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    avatar: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
    },
    bio: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>('User', UserSchema);
