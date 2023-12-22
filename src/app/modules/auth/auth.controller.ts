import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginResponse } from './auth.interface';
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


export const AuthController = {
  loginUser,
};
