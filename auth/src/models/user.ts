import mongoose from 'mongoose';
import { DuplicatedEmail } from '../errors';
import { PasswordHash } from "../utils";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
};

export interface UserModel extends mongoose.Model<UserDocument> {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function validateUniqueness(this: UserDocument, next) {
  const existingUser = await User.findOne({ email: this.email });

  if (existingUser) {
    throw new DuplicatedEmail();
  }

  next();
});

userSchema.pre('save', async function hashPassword(this: UserDocument, next) {
  if(this.isModified('password')) {
    const hashedPassword = PasswordHash.toHashSync({ password: this.get('password') });
    this.set('password', hashedPassword);
  }
  next();
})

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
