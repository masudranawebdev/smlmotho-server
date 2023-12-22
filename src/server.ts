/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
// import { logger, errorlogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;
async function dbConnected() {
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleString('en-us', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  try {
    await mongoose
      .connect(config.database_uri as string, {
        autoIndex: true,
      })
      .then(() => {
        console.log(
          '\x1b[36m%s\x1b[0m',
          '[MR]',
          time,
          ':',
          date,
          ': Database is connected Successfully :)'
        );
        server = app.listen(config.port, () => {
          console.log(
            '\x1b[36m%s\x1b[0m',
            '[MR]',
            time,
            ':',
            date,
            `: mobomart app listening on port ${config.port}`
          );
        });
      });
  } catch (error) {
    console.error('Mongoose is Connected Error: ', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
dbConnected();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
