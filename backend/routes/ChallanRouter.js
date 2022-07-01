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

ChallanRouter.get('/table', async (req, res) => {
  const challans = await Challan.find();
  if (challans) {
    res.send(challans);
  } else {
    res.status(404).send({ message: 'challans are Not Found' });
  }
});

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

ChallanRouter.put('/update/:License', async (req, res) => {
  const challan = await Challan.findOne({ License: req.params.License });
  if (challan) {
    challan.name = req.body.name;
    challan.date = req.body.date;
    challan.address = req.body.address;
    challan.License = req.body.License;
    challan.vehicle = req.body.vehicle;
    challan.wheeler = req.body.wheeler;
    challan.createdBy = req.body.createdBy;
    challan.offence = req.body.offence;
    challan.challan = req.body.challan;
    challan.submitDate = req.body.submitDate;
    const updatedUser = await challan.save();
    res.send(updatedUser);
  } else {
    res.status(404).send({ message: 'User not found' });
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
