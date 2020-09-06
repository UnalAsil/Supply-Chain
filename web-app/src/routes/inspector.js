import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const invoke = require('../../../foodchain/javascript/invoke');

const router = Router();

// Create Inspector
router.post('/createInspector', (req, res) => { 
    const org = req.body.org;
    const user = req.body.user;
    const price = req.body.price;
  
    invoke.invoke(org, user, ['CreateInspector', price]).then(result => {
      return res.send(result); 
    });
  
    return res.send("Succesfull.");
});
  
// Inspect product
router.post('/inspectProduct', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const prodID = req.body.prodID;
  const score = req.body.score;

  invoke.invoke(org, user, ['InspectProduct', prodID, score]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});

// Hire inspector
router.post('/hireInspector', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const prodID = req.body.prodID;
  const inspectID = req.body.inspectID;

  invoke.invoke(org, user, ['HireInspector', prodID, inspectID]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});

export default router;
