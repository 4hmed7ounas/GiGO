// models/service.ts
import { Document, Schema, model } from 'mongoose';

interface IService extends Document {
  image: string;
  profileImage: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
}

const serviceSchema = new Schema<IService>({
  image: { type: String, required: true },
  profileImage: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  price: { type: String, required: true },
});

const Service = model<IService>('Service', serviceSchema);

export default Service;
