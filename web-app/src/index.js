import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models';
import routes from './routes';
const app = express(); 

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/products', routes.product);
app.use('/assets', routes.asset);
app.use('/filterAssets', routes.filterAssets);
app.use('/update', routes.update);
app.use('/inspector', routes.inspector);
app.use('/logistic', routes.logistic);

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Supplu Chain app listening on port ${process.env.PORT}!`),
);
