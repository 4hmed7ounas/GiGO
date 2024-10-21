import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  keyWords: { type: [String], required: true },
  description: { type: String, required: true },
  tiers: [
    {
      price: { type: String, required: true },
      deliveryTime: { type: String, required: true },
      details: { type: String, required: true },
    },
  ],
  images: { type: [String], required: true },
  userId: { type: String, required: true },
});

// Check if the model already exists before creating it
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;