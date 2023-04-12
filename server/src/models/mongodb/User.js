import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    avatarFullUrl: {
      type: String,
      required: false,
    },
    token: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
    facebookId: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);


export default User;