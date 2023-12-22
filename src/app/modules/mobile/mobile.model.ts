import { Schema, model } from 'mongoose';
import { IMobile, MobileModel } from './mobile.interface';

const MobileSchema = new Schema<IMobile, MobileModel>(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    color: {type: [String], required: true},
    size: {type: String, required: true,},
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    processor: { type: String, required: true },
    memory: { type: String, required: true },
    os: { type: String, required: true },
    status: {
      type: String,
      enum: ['in-stock', 'out-stock', 'comming'],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Mobile = model<IMobile, MobileModel>('Mobile', MobileSchema);
