import { Document, model, Schema } from 'mongoose';

export interface Stock extends Document {
  image: string;
  description: string;
  optionType: 'swing' | 'long';
  createdAt: Date;
  updatedAt: Date;
}

const StockSchema = new Schema<Stock>(
  {
    image: { type: String, required: true },
    description: { type: String, required: true },
    optionType: { type: String, enum: ['swing', 'long'], required: true },
  },
  {
    timestamps: true,
  }
);

export const StockModel = model<Stock>('Stock', StockSchema); 