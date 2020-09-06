import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const query = require('../../../foodchain/javascript/query');
const invoke = require('../../../foodchain/javascript/invoke');

const router = Router();


router.get('/', (req, res) => {
    return res.send("update what?"); 
});

/*
router.get('/:prodID', (req, res) => {
    return res.send("update what?"); 
});*/

// Update product price
router.post('/productPrice', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const prodID = req.body.prodID;
  const newPrice = req.body.newPrice;

  invoke.invoke(org, user, ['UpdateProductPrice', prodID, newPrice]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});

// Update inspector price
router.post('/inspectorPrice', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const newPrice = req.body.newPrice;

  invoke.invoke(org, user, ['UpdateInspectorPrice', newPrice]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});

// Update logistic price
router.post('/logisticPrice', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const priceRent = req.body.priceRent;
  const priceKM = req.body.priceKM;

  invoke.invoke(org, user, ['UpdateLogisticPrice', priceRent, priceKM]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});

// Updates logistic truck capacity.
router.post('/logisticTruckCapacity', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const truckCapacity = req.body.truckCapacity;

  invoke.invoke(org, user, ['UpdateLogisticTruckCapacity', truckCapacity]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});


export default router;
