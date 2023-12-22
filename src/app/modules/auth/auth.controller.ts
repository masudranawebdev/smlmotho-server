import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginResponse, IRefeshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    const { refeshToken, ...others } = result;
    const options = {
      secure: config.node_env === 'production',
      httpOnly: true,
    };
    res.cookie('refeshToken', refeshToken, options);

    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user login successfully',
      data: others,
    });
  }
);

const refeshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refeshToken } = req.cookies;

    const result = await AuthService.refeshToken(refeshToken);

    const options = {
      secure: config.node_env === 'production',
      httpOnly: true,
    };

    res.cookie('refeshToken', refeshToken, options);

    sendResponse<IRefeshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user login successfully',
      data: result,
    });
  }
);

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;
    const result = await AuthService.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'password change successfully',
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
  refeshToken,
  changePassword,
};
