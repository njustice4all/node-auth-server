import passport from 'passport';
import LocalStrategy from 'passport-local';

import AuthModel from './auth-model';

const localOption = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOption, async (email, password, done) => {
  const user = await AuthModel.findOne({ email });

  try {
    if (!user) {
      return done(false, { error: 'Unauthorized' });
    } else if (!user.authenticateUser(password)) {
      return done(false, { error: 'Unauthorized' });
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(localLogin);

export const authLocal = passport.authenticate('local', { session: false });
