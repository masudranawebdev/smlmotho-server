"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});
let server;
async function dbConnected() {
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleString('en-us', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    try {
        await mongoose_1.default
            .connect(index_1.default.database_uri, {
            autoIndex: true,
        })
            .then(() => {
            console.log('\x1b[36m%s\x1b[0m', '[MR]', time, ':', date, ': Database is connected Successfully :)');
            server = app_1.default.listen(index_1.default.port, () => {
                console.log('\x1b[36m%s\x1b[0m', '[MR]', time, ':', date, `: mobomart app listening on port ${index_1.default.port}`);
            });
        });
    }
    catch (error) {
        console.error('Mongoose is Connected Error: ', error);
    }
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.error(error);
                process.exit(1);
            });
        }
        else {
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
