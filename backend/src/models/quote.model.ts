import { Document, Schema, model } from 'mongoose';

export interface IQuote extends Document {
  text: string;
}

const QuoteSchema = new Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IQuote>('Quote', QuoteSchema); 