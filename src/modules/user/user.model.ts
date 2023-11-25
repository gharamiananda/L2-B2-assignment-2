import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { TAddress, TUser, UserModel } from './user.interface';
import { TProduct } from '../product/product.interface';
import config from '../../app/config';

export const productSchema = new Schema<TProduct, UserModel>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'COuntry is required'],
  },
});

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'UserId is required'],
  },
  username: {
    type: String,
    unique: true,

    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
    },
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [],
  address: addressSchema,

  orders: [productSchema],
});

userSchema.pre(/save/, async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  const user = this as unknown as TUser;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_solt_rounds),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.static('isUserExists', async function (userId: string) {
  const isUserExists = await User.findOne({ userId });
  return isUserExists;
});

const User = model<TUser, UserModel>('User', userSchema);

export default User;
