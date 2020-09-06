import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const query = require('../../../foodchain/javascript/query');

const router = Router();

router.get('/', (req, res) => {
  return "";
});

router.get('/:assetID', (req, res) => {

  query.query('org1', 'caner_1a', ['ReadAsset', req.params.assetID]).then(result => {
    return res.send(JSON.parse(result));
  });

});


export default router;
