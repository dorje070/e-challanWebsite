import express from 'express';
import User from '../model/UserSchema.js';

const Router = express.Router();
Router.get('/', async (req, res) => {
  const data = await User.find();
  res.send(data);
});

export default Router;
