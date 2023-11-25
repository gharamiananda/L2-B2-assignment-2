"use strict";
// import { TProduct } from '../product/product.interface';
// import { TUser } from './user.interface';
// import User from './user.model';
// export const createUserIntoDB = async (user: TUser) => {
//   const data = await User.create(user);
//   return data;
// };
// export const getUsersFromDB = async () => {
//   const data = await User.find({}, { password: 0 });
//   return data;
// };
// export const getUserFromDB = async (userId: string) => {
//   const data = await User.findOne({ userId }, { password: 0 });
//   return data;
// };
// export const deleteUserFromDB = async (userId: string) => {
//   const data = await User.findOneAndDelete({ userId }, { password: 0 });
//   return data;
// };
// export const updatedUserFromDB = async (userId: string, userData: TUser) => {
//   const data = await User.findOneAndUpdate(
//     { userId },
//     { ...userData },
//     { upsert: true },
//   );
//   return data;
// };
// export const updatedOrderUserFromDB = async (
//   userId: string,
//   orderData: TProduct[],
// ) => {
//   const data = await User.updateOne(
//     { userId },
//     { $addToSet: { orders: orderData } },
//     { upsert: true },
//   );
//   return data;
// };
// export const geOrdersUserFromDB = async (userId: string) => {
//   const data = await User.findOne({ userId }, { password: 0 });
//   return data;
// };
