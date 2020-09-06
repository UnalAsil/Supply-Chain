import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send("user what?");
});

// Create new user wallet
router.post('/createWallet', (req, res) => { 
  const org = req.body.org;
  const user = req.body.user;
  const balance = req.body.balance;
  const role = req.body.role;

  invoke.invoke(org, user, ['CreateUserWallet', balance, role]).then(result => {
    return res.send(result); 
  });

  return res.send("Succesfull.");
});

export default router;
