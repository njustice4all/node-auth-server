import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';

const AuthSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate: {
      validator(email) {
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return emailRegex.test(email);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator(password) {
        return password.length >= 6 && password.match(/\d+/g);
      },
      message: 'not a valid password',
    },
  },
  username: String,
});

AuthSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!!',
});

// before save (don't use arrow function because access 'this' context)
AuthSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

// add custom methods
AuthSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },

  authenticateUser(password) {
    return compareSync(password, this.password);
  },
};

export default mongoose.model('Auth', AuthSchema);
