import config from '../../../config';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import { User } from './user.model';

const signup = async (user: IUser): Promise<IUser | undefined> => {
  // password hash
  const hashPassword = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  user.password = hashPassword;
  //set role
  const result = await User.create(user);
  return result;
};

const getAlluser = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};

const getDataById = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

export const UserService = {
  signup,
  getAlluser,
  getDataById,
};
