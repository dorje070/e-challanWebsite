import mongoose from 'mongoose';

const ChallanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  date: { type: Date, required: true },
  address: { type: String, required: true },
  linencse: { type: String, required: true, unique: true },
  vehicle: { type: String, required: true, unique: true },
  wheeler: { type: String, required: true },
  createdBy: { type: String, required: true },
  offence: { type: String, required: true },
  submitDate: { type: Date, required: true },
});

const Challan = mongoose.model('CHALLAN', ChallanSchema);

export default Challan;
