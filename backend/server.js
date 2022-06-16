import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/UserRouter.js';

dotenv.config();

mongoose
  .connect(process.env.MONODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use('/api', UserRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`sever at http://localhost:${port}`);
});
