import { Router } from 'express';

import * as authController from './auth-controller';
import authServices from './auth-services';

const routes = new Router();

routes.post('/register', authController.signup);
routes.post('/login', authServices.loginMiddleware, authController.login);

export default routes;
