import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import AuthModel from './auth-model';
import constants from '../../config/constants';

const localOption = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOption, async (email, password, done) => {
  const user = await AuthModel.findOne({ email });

  try {
    if (!user) {
      return done(null, false, { error: 'Unauthorized' });
    } else if (!user.authenticateUser(password)) {
      return done(null, false, { error: 'Unauthorized' });
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

const jwtOption = {
  // header token startswith 'JWT'
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOption, async (payload, done) => {
  try {
    const user = await AuthModel.findById(payload._id);

    if (!user) {
      return done(null, false, { error: 'Unauthorized' });
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
