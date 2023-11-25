"use strict";
// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import {
//   createUserIntoDB,
//   deleteUserFromDB,
//   geOrdersUserFromDB,
//   getUserFromDB,
//   getUsersFromDB,
//   updatedOrderUserFromDB,
//   updatedUserFromDB,
// } from './user.service';
// import config from '../../app/config';
// export const createUser = async (req: Request, res: Response) => {
//   const { user: userData } = req.body;
//   try {
//     const data = await createUserIntoDB(userData);
//     res.status(200).json({
//       success: true,
//       message: 'User created successfully',
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'User created Failed',
//       error,
//     });
//   }
// };
// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const data = await getUsersFromDB();
//     res.status(200).json({
//       success: true,
//       message: 'Users fetched successfully!',
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'User not found',
//       error,
//     });
//   }
// };
// export const getUser = async (req: Request, res: Response) => {
//   try {
//     const data = await getUserFromDB(req.params.userId);
//     if (!data) {
//       res.status(400).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: 'User fetched successfully!',
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'User not found',
//       error,
//     });
//   }
// };
// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const data = await deleteUserFromDB(req.params.userId);
//     if (!data) {
//       res.status(400).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: 'User Deleted successfully!',
//       data: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'User not found',
//       error,
//     });
//   }
// };
// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { user: userData } = req.body;
//     userData.password = await bcrypt.hash(
//       userData.password,
//       Number(config.bcrypt_solt_rounds),
//     );
//     const data = await updatedUserFromDB(req.params.userId, userData);
//     if (!data) {
//       res.status(400).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: 'User updated successfully!',
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'User not found',
//       error,
//     });
//   }
// };
// export const updateOrderUser = async (req: Request, res: Response) => {
//   try {
//     const { orders: orderData } = req.body;
//     const data = await updatedOrderUserFromDB(req.params.userId, orderData);
//     if (!data) {
//       res.status(400).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: 'User Order updated successfully!',
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'User not found',
//       error,
//     });
//   }
// };
// export const getOrdersUser = async (req: Request, res: Response) => {
//   try {
//     const data = await geOrdersUserFromDB(req.params.userId);
//     if (!data) {
//       res.status(400).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: 'User Order updated successfully!',
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'User not found',
//       error,
//     });
//   }
// };
