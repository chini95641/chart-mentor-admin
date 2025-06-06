import { Schema, model, Document } from 'mongoose';

export interface IChartOfDay extends Document {
  imageUrl: string;
  description: string;
}

const ChartOfDaySchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IChartOfDay>('ChartOfDay', ChartOfDaySchema); 