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
      linencse: req.body.linencse,
      vehicle: req.body.vehicle,
      wheeler: req.body.wheeler,
      createdBy: req.body.createdBy,
      offence: req.body.offence,
      submitDate: req.body.submitDate,
    });
    const challan = await Newchallan.save();

    res.send({
      _id: challan._id,
      name: challan.name,
      date: challan.date,
      address: challan.address,
      linencse: challan.linencse,
      wheeler: challan.wheeler,
      createdBy: challan.createdBy,
      offence: challan.wheeler,
      submitDate: challan.submitDate,
    });
  })
);

ChallanRouter.get('/:linencse', async (req, res) => {
  const challan = await Challan.findOne({ linencse: req.params.linencse });
  if (challan) {
    res.send(challan);
  } else {
    res.status(404).send({ message: 'challan Not Found' });
  }
});

export default ChallanRouter;
