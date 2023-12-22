import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const signup: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await UserService.signup(data);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Signup is successfully',
      data: result,
    });
  }
);
const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAlluser();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All data retrived is successfully',
      data: result,
    });
  }
);
const getDataById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getDataById(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single data retrived is successfully',
      data: result,
    });
  }
);

const countAllData: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.countAllData();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data counted Successfully',
      data: result,
    });
  }
);

export const UserController = {
  signup,
  getAllUser,
  getDataById,
  countAllData,
};
