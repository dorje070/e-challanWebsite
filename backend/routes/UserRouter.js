import express from 'express';
import User from '../model/UserSchema.js';
import data from '../data.js';

const Router = express.Router();

Router.get('/seed', async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

Router.get('/', async (req, res) => {
  const data = await User.find();
  res.send(data);
});

export default Router;
