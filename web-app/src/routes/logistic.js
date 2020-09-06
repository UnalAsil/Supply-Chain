import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const invoke = require('../../../foodchain/javascript/invoke');

const router = Router();

// Create Logistic
router.post('/createLogistic', (req, res) => { 
    const org = req.body.org;
    const user = req.body.user;
    const priceRent = req.body.priceRent;
    const priceKM = req.body.priceKM;
    const capacity = req.body.capacity;
  
    invoke.invoke(org, user, ['CreateLogistic', priceRent, priceKM, capacity]).then(result => {
      return res.send(result); 
    });
  
    return res.send("Succesfull.");
});

// Transport product
router.post('/transportProduct', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const prodID = req.body.prodID;
  const newX = req.body.newX;
  const newY = req.body.newY;

  invoke.invoke(org, user, ['TransportProduct', prodID, newX, newY]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});


// Transport product
router.post('/hireLogistic', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const prodID = req.body.prodID;
  const logisticID = req.body.logisticID;

  invoke.invoke(org, user, ['HireLogistic', prodID, logisticID]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});
  
export default router;
