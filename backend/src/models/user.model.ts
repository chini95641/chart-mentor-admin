import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface User extends Document {
  id: string;
  avatar?: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  role?: 'ADMIN' | 'LEADER' | 'MATERIAL' | 'TRAVEL' | 'COST';
  membership: 'free' | 'premium';
  expiration_date?: Date | null;
  password: string;
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
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    name: { type: String },
    email: { type: String },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
    },
    membership: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
      required: true,
    },
    expiration_date: {
      type: Date,
      default: null,
    },
    bio: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>('User', UserSchema);
