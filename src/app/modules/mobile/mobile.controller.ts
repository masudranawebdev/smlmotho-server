import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { MobileService } from './mobile.service';
import { IMobile } from './mobile.interface';
import { mobileFilterableField } from './mobile.constance';

const insertIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await MobileService.insertIntoDB(data);
    sendResponse<IMobile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data Created Successfully',
      data: result,
    });
  }
);

const getAllData: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, mobileFilterableField);

    const paginationOptions = pick(req.query, paginationFields);
    const result = await MobileService.getAllData(filter, paginationOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All data Retrived Successfully',
      data: result,
    });
  }
);

const getSingleData: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MobileService.getSingleData(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single data Retrived Successfully',
      data: result,
    });
  }
);

export const MobileController = {
  insertIntoDB,
  getAllData,
  getSingleData,
};
