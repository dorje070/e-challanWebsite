import mongoose from 'mongoose';

const ChallanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  date: { type: Date, required: true },
  address: { type: String, required: true },
  License: { type: String, required: true, unique: true },
  vehicle: { type: String, required: true, unique: true },
  wheeler: { type: String, required: true },
  createdBy: { type: String, required: true },
  offence: { type: String, required: true },
  challan: { type: Number, required: true },
  submitDate: { type: Date, required: true },
});

const Challan = mongoose.model('CHALLAN', ChallanSchema);

export default Challan;
