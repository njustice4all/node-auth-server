import express from 'express';

import constants from './config/constants';
import './config/db';
import middlewares from './config/middlewares';
import routes from './modules';

const app = express();

middlewares(app);

app.use('/api', routes);

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  }

  console.log(`server is running on port ${constants.PORT}`);
  console.log(`environments: ${process.env.NODE_ENV}`);
});
