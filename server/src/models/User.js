// User.js
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// import schema from Wine.js
import wineSchema from './Wine.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedWines to be an array of data that adheres to the wineSchema
    savedWines: [wineSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `wineCount` with the number of saved wines we have
userSchema.virtual('wineCount').get(function () {
  return this.savedWines.length;
});

const User = model('User', userSchema);

export default User;
