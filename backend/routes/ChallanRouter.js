import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Challan from '../model/ChallanSchema.js';

const ChallanRouter = express.Router();

ChallanRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const Newchallan = await Challan({
      name: req.body.name,
      date: req.body.date,
      address: req.body.address,
      License: req.body.License,
      vehicle: req.body.vehicle,
      wheeler: req.body.wheeler,
      createdBy: req.body.createdBy,
      offence: req.body.offence,
      challan: req.body.challan,
      submitDate: req.body.submitDate,
    });
    const challan = await Newchallan.save();

    res.send({
      _id: challan._id,
      name: challan.name,
      date: challan.date,
      address: challan.address,
      License: challan.License,
      wheeler: challan.wheeler,
      createdBy: challan.createdBy,
      offence: challan.wheeler,
      challan: challan.Challan,
      submitDate: challan.submitDate,
    });
  })
);

ChallanRouter.get('/delete/:License', async (req, res) => {
  const challan = await Challan.findOneAndDelete({
    License: req.params.License,
  });
  if (challan) {
    res.send(challan);
  } else {
    res.status(404).send({ message: 'challan Not Found' });
  }
});

ChallanRouter.get('/:License', async (req, res) => {
  const challan = await Challan.findOne({ License: req.params.License });
  if (challan) {
    res.send(challan);
  } else {
    res.status(404).send({ message: 'challan Not Found' });
  }
});

export default ChallanRouter;
