import mongoose from 'mongoose';

const gigySchema = new mongoose.Schema({
  title: { type: String, required: true },
  keywords: { type: [String], required: true }, // Array of strings for keywords
  description: { type: String, required: true },
  tier: { 
    type: {
      price: { type: Number, required: true },
      deliveryTime: { type: Number, required: true },
    },
    required: true 
  },
  imageURL: { type: String, required: true }, // Assuming a single image URL
  userId: { type: String, required: true }, // Assuming a single image URL

});

// Check if the model already exists before creating it
const Gigy = mongoose.models.Gigy || mongoose.model('Gigy', gigySchema);

export default Gigy;
