import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginData,
  ILoginResponse,
  IRefeshTokenResponse,
} from './auth.interface';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser } from '../user/user.interface';

const loginUser = async (payload: ILoginData): Promise<ILoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, false, "user can't find");
  }
  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      false,
      "password doesn't match"
    );
  }

  const { id, role, email: userEmail } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { id, role, userEmail },
    config.jwt.access_secret as Secret,
    { expiresIn: config.jwt.access_expires }
  );

  const refeshToken = jwtHelper.createToken(
    { id, role, userEmail },
    config.jwt.refesh_secret as Secret,
    { expiresIn: config.jwt.refesh_expires }
  );

  return {
    accessToken,
    refeshToken,
  };
};

const refeshToken = async (token: string): Promise<IRefeshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.access_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, false, 'invalid refesh token');
  }

  const { userEmail } = verifiedToken;

  //cheking user has or deleted
  const isUserExist = await User.findOne({ email: userEmail });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, false, 'user does not exist');
  }
  const { id: user_id, role } = isUserExist;

  //generate new token
  const newAccessToken = jwtHelper.createToken(
    {
      id: user_id,
      role,
    },
    config.jwt.access_secret as Secret,
    {
      expiresIn: config.jwt.access_expires,
    }
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<IUser | null> => {
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, false, 'user not found');
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      false,
      'Old password is not match'
    );
  }

  const hashNewPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );
  const filter = { _id: user.id };
  const update = { password: hashNewPassword };
  const options = { new: true };
  const result = await User.findOneAndUpdate(filter, update, options);
  return result;
};
export const AuthService = {
  loginUser,
  refeshToken,
  changePassword,
};
