import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const query = require('../../../foodchain/javascript/query');

const router = Router();

router.get('/', (req, res) => {
  // Get all assets
  query.query('org1', 'caner_1a', ['GetAllAssets']).then(result => {
    console.log(JSON.parse(result));
    return res.send(JSON.parse(result)); 
  });

});

router.get('/:assetName', (req, res) => {  
    // Filter assets by stateTypes
    query.query('org1', 'caner_1a', ['FilterAssets', req.params.assetName]).then(result => {
        console.log(JSON.parse(result));
        return res.send(JSON.parse(result)); 
    });

});

export default router;
