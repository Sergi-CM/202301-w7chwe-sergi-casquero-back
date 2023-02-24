import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  relationships: {
    type: Object,
    friends: {
      type: Array,
    },
    enemies: {
      type: Array,
    },
  },
});

const User = model("User", userSchema, "users");

export default User;
