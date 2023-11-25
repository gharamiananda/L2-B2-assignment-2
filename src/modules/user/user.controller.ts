/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import {
  createUserIntoDB,
  deleteUserFromDB,
  geOrdersTotalUserFromDB,
  geOrdersUserFromDB,
  getUserFromDB,
  getUsersFromDB,
  updatedOrderUserFromDB,
  updatedUserFromDB,
} from './user.service';
import config from '../../app/config';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userData = req.body;

  try {
    const studentValidationSchema = z.object({
      userId: z.number(),
      username: z.string(),
      password: z.string(),
      fullName: z.object({
        firstName: z
          .string()
          .max(20, { message: 'First Name is less than 20 characters' }),
        lastName: z
          .string()
          .max(20, { message: 'Last Name is less than 20 characters' }),
      }),
      hobbies: z.array(z.string()),
      age: z.number(),
      email: z.string(),
      isActive: z.boolean(),
      address: z.object({
        street: z.string(),
        city: z.string(),
        country: z.string(),
      }),
    });

    const userInfo = studentValidationSchema.parse(userData);

    const data = await createUserIntoDB(userInfo);
    console.log('data', data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDataWithoutPassword } = data.toObject();
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: userDataWithoutPassword,
    });
  } catch (error) {
    if (error == 'Error: User not exists') {
      res.status(500).json({
        success: false,
        message: 'User not found',

        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await getUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data,
    });
  } catch (error) {
    if (error == 'Error: User not exists') {
      res.status(500).json({
        success: false,
        message: 'User not found',

        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getUserFromDB(req.params.userId);
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const data = await deleteUserFromDB(req.params.userId);
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
      data: null,
    });
  } catch (error) {
    if (error == 'Error: User not exists') {
      res.status(500).json({
        success: false,
        message: 'User not found',

        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = req.body;

    if (userData.password) {
      userData.password = await bcrypt.hash(
        userData.password,
        Number(config.bcrypt_solt_rounds),
      );
    }

    const studentValidationSchema = z.object({
      userId: z.number(),
      username: z.string(),
      password: z.string(),
      fullName: z.object({
        firstName: z
          .string()
          .max(20, { message: 'First Name is less than 20 characters' }),
        lastName: z
          .string()
          .max(20, { message: 'First Name is less than 20 characters' }),
      }),
      hobbies: z.array(z.string()),

      age: z.number(),
      email: z.string(),
      isActive: z.boolean(),
      address: z.object({
        street: z.string(),
        city: z.string(),
        country: z.string(),
      }),
    });

    const userInfo = studentValidationSchema.parse(userData);

    const data = await updatedUserFromDB(req.params.userId, userInfo);
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: data,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 11000) {
      const keyPattern = error.keyPattern;
      const keyValue = error.keyValue;

      return res.status(400).json({
        success: false,
        message: 'Unique constraint violation',
        error: {
          code: 400,
          description: 'Duplicate key error',
          keyPattern,
          keyValue,
        },
      });
    }

    if (error == 'Error: User not exists') {
      res.status(500).json({
        success: false,
        message: 'User not found',

        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  }
};

export const updateOrderUser = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    await updatedOrderUserFromDB(req.params.userId, orderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error,
    });
  }
};

export const getOrdersUser = async (req: Request, res: Response) => {
  try {
    const data = await geOrdersUserFromDB(req.params.userId);

    if (!data?.orders?.length) {
      res.status(200).json({
        success: true,
        message: 'You have no order information',
        data,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User Order updated successfully!',
      data: data,
    });
  } catch (error) {
    if (error == 'Error: User not exists') {
      res.status(500).json({
        success: false,
        message: 'User not found',

        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  }
};

export const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const [data] = await geOrdersTotalUserFromDB(req.params.userId);
    if (!data) {
      res.status(200).json({
        success: true,
        message: 'You have no order information',
        data,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data,
    });
  } catch (error) {
    if (error == 'Error: User not exists') {
      res.status(500).json({
        success: false,
        message: 'User not found',

        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  }
};
