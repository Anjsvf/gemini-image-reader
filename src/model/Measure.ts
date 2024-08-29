// src/models/Measure.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMeasure extends Document {
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
  measure_value: number;
  measure_uuid: string;
  has_confirmed: boolean;
  image_url: string;
}

const MeasureSchema: Schema = new Schema({
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, required: true },
  measure_value: { type: Number, required: true },
  measure_uuid: { type: String, required: true },
  has_confirmed: { type: Boolean, default: false },
  image_url: { type: String, required: true },
});

export default mongoose.model<IMeasure>('Measure', MeasureSchema);
