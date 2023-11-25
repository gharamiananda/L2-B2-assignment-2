import { Model } from 'mongoose';

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies?: string[];
  address: TAddress;
  orders?: [];
};

export type TUpdateUser = {
  userId?: number;
  username?: string;
  password?: string;
  fullName?: {
    firstName?: string;
    lastName?: string;
  };
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: TAddress;
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<boolean | null>;
}
