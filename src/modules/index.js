import { Router } from 'express';

import authRoutes from './auth';
import authServices from './auth/auth-services';

const routes = new Router();

routes.use('/auth', authRoutes);

routes.use('/hello', authServices.jwtMiddleware, (req, res) => {
  res.send('if you see this, that mean you logged');
});

export default routes;
