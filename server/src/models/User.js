import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    savedWines: [
      {
        wineId: {
          type: String,
          required: true
        },
        name: String,
        type: String,
        region: String,
        rating: Number,
        image_url: String
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      }
    },
    id: false
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcryptjs.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;

export { User }
