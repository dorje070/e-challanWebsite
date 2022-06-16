import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Router from './routes/router.js';

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

app.use('/api/seed', Router);
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`sever at http://localhost:${port}`);
});
