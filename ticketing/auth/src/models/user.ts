import mongoose from "mongoose";

// An interface that describes the properties that are required to create a new user
interface userAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that the user model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: userAttrs): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
