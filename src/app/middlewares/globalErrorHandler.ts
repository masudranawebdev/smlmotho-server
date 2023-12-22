/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import handleValidationError from '../../errors/handleValidationError';
import { IGenericErrorMessage } from '../../interface/error';
import ApiError from '../../errors/ApiError';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';
import { MongoServerError } from 'mongodb';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.node_env === 'development'
    ? console.log('globalErrorHandler', error)
    : console.error('globalErrorHandler', error);

  let statusCode = 500;
  let success = false;
  let message = 'Something went wrong !';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplefiedError = handleValidationError(error);
    statusCode = simplefiedError?.statusCode;
    success = false;
    message = simplefiedError?.message;
    errorMessage = simplefiedError?.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplefiedError = handleCastError(error);
    statusCode = simplefiedError.statusCode;
    success = false;
    message = simplefiedError.message;
    errorMessage = simplefiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplefiedError = handleZodError(error);
    statusCode = simplefiedError.statusCode;
    success = false;
    message = simplefiedError.message;
    errorMessage = simplefiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    success = false;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof MongoServerError && error.code === 11000) {
    // Handle duplicate key error here
    statusCode = 400;
    success = false;
    message = 'Duplicate key violation';

    // Extract the duplicate key path from the error message (errmsg)
    const errmsg = error.errmsg;
    // eslint-disable-next-line no-useless-escape
    const match = errmsg.match(/index:\s[\w\.]+_([\w]+)/);
    if (match) {
      const duplicateKeyPath = match[1];
      errorMessage = [
        {
          path: duplicateKeyPath,
          message: `Duplicate key violation for the field: ${duplicateKeyPath}`,
        },
      ];
    } else {
      errorMessage = [
        {
          path: '',
          message: 'Duplicate key violation',
        },
      ];
    }
  } else if (error instanceof Error) {
    message = error?.message;
    success = false;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success,
    message,
    errorMessage,
    stack: config.node_env !== 'production' ? error?.message : undefined,
  });
};

export default globalErrorHandler;
