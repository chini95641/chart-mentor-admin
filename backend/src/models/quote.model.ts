import { Document, Schema, model } from 'mongoose';

export interface IQuote extends Document {
  image: string;
}

const QuoteSchema = new Schema(
  {
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IQuote>('Quote', QuoteSchema); 