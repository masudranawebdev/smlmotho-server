import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const apiHandleNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
};

export default apiHandleNotFound;
