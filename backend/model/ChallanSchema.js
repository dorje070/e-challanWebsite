import mongoose from 'mongoose';
const ChallanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
