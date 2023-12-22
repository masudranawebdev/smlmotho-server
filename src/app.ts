/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import config from '../src/config/index'
import cookieParser from 'cookie-parser';
const app: Application = express();

//using cors
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Welcome to packnshift server',
    data: {
      message: 'How can i help you sir?',
    },
  });
});

//import route
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import apiHandleNotFound from './app/middlewares/apiHandleNotFound';
import httpStatus from 'http-status';

//add custom api route
app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

// handle not found
app.use(apiHandleNotFound);

export default app;
