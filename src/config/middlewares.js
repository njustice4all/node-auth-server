import bodyParser from 'body-parser';

const isDev = process.env.NODE_ENV === 'development';

export default app => {
  // parse application/json
  app.use(bodyParser.json());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  if (isDev) {
    // logger on cli
    const morgan = require('morgan');

    app.use(morgan('dev'));
  }
};
