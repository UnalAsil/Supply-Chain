import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const query = require('../../../foodchain/javascript/query');
const invoke = require('../../../foodchain/javascript/invoke');

const router = Router();

router.get('/:prodID', (req, res) => {

  query.query('org1', 'caner_1a', ['FilterAssets', 'product']).then(result => {
    console.log(JSON.parse(result));
    return res.send(JSON.parse(result));
  });

});

// Create product
router.post('/createProduct', (req, res) => {
  const org = req.body.org;
  const user = req.body.user;

  const prodID = uuidv4();
  const type = req.body.type;
  const kilo = req.body.kilo;
  const price = req.body.price;
  const locX = req.body.x;
  const locY = req.body.y;

  invoke.invoke(org, user, ['CreateProduct', prodID, type, kilo, price, locX, locY]).then(result => {
    return res.send(result);
  });

  return res.send("Succesfull.");
});

// Buy product
router.post('/buyProduct', (req, res) => {
  const org = req.body.org;
  const user = req.body.user;
  const prodID = req.body.prodID;

  invoke.invoke(org, user, ['BuyProduct', prodID]).then(result => {
    return res.send(result);
  });

  return res.send("Succesfull.");
});

// Buy partial product
router.post('/buyPartialProduct', (req, res) => {
  const org = req.body.org;
  const user = req.body.user;
  const prodID = req.body.prodID;
  const amount = req.body.amount;

  invoke.invoke(org, user, ['BuyPartialProduct', prodID, amount]).then(result => {
    return res.send(result);
  });

  return res.send("Succesfull.");
});


export default router;
