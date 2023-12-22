import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginData,
  ILoginResponse,
} from './auth.interface';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

  const { id, userName, email: userEmail } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { id,userName, userEmail },
    config.jwt.access_secret as Secret,
    { expiresIn: config.jwt.access_expires }
  );

  const refeshToken = jwtHelper.createToken(
    { id,userName, userEmail },
    config.jwt.refesh_secret as Secret,
    { expiresIn: config.jwt.refesh_expires }
  );

  return {
    accessToken,
    refeshToken,
  };
};
export const AuthService = {
  loginUser,
};
