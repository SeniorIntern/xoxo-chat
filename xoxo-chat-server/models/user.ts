import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { serverConfig } from '../config';

const { JWT_SECRET } = serverConfig;

interface Intro {
  shortIntro: string;
  study: string;
  location: string;
  job: string;
}

const introSchema = new mongoose.Schema<Intro>({
  shortIntro: {
    type: String,
    maxlength: 60
  },
  study: {
    type: String,
    maxlength: 20
  },
  location: {
    type: String,
    maxlength: 20
  },
  job: {
    type: String,
    maxlength: 20
  }
});

interface User {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  coverImage?: string;
  friends: [mongoose.Schema.Types.ObjectId];
  isAdmin?: boolean;
  intro?: mongoose.Schema<Intro>;
  about?: string;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  profileImage: {
    type: String
  },
  coverImage: {
    type: String
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  intro: {
    type: introSchema
  },
  about: {
    type: String,
    maxlength: 260
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin
    },
    JWT_SECRET
  );
  return token;
};

const User = mongoose.model<User>('User', userSchema);

export default User;
