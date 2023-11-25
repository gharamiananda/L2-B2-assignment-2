import { TProduct } from '../product/product.interface';
import { TUpdateUser, TUser } from './user.interface';
import User from './user.model';

export const createUserIntoDB = async (user: TUser) => {
  const userId = Number(user.userId);
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not exists');
  }

  const data = await User.create(user);
  return data;
};

export const getUsersFromDB = async () => {
  const data = await User.find({}, { password: 0, orders: 0, _id: 0 });

  return data;
};

export const getUserFromDB = async (userId: string) => {
  const data = await User.findOne(
    { userId },
    { password: 0, orders: 0, _id: 0 },
  );

  return data;
};

export const deleteUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(Number(userId)))) {
    throw new Error('User not exists');
  }

  const data = await User.findOneAndDelete({ userId }, { password: 0 });

  return data;
};

export const updatedUserFromDB = async (
  userId: string,
  userData: TUpdateUser,
) => {
  const isUserExists = await User.isUserExists(Number(userId));
  if (!isUserExists) {
    throw new Error('User not exists');
  }

  const data = await User.findOneAndUpdate(
    { userId: Number(userId) },
    { ...userData },
    {
      new: true,
      projection: {
        // fullName: 1,
        // email: 1,
        orders: 0,
        password: 0,
      },
    },
  );

  return data;
};

export const updatedOrderUserFromDB = async (
  userId: string,
  orderData: TProduct[],
) => {
  if (!(await User.isUserExists(Number(userId)))) {
    throw new Error('User not exists');
  }
  const orderInfo = await User.findOneAndUpdate(
    { userId: Number(userId) },
    { $push: { orders: orderData } },
    { new: true, projection: { fullName: 0 } },
  );

  return orderInfo;
};

export const geOrdersUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(Number(userId)))) {
    throw new Error('User not exists');
  }
  const data = await User.findOne({ userId: Number(userId) }, { orders: 1 });
  return data;
};

export const geOrdersTotalUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(Number(userId)))) {
    throw new Error('User not exists');
  }
  const data = await User.aggregate([
    { $match: { userId: Number(userId) } },
    { $unwind: '$orders' },

    {
      $group: {
        _id: '$_id',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          // $push: '$$ROOT',
        },
      },
    },
    { $project: { _id: 0 } },
  ]);

  return data;
};
