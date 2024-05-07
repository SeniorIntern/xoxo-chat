import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { serverConfig } from "../config";

const { JWT_SECRET } = serverConfig;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    JWT_SECRET,
  );
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
