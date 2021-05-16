import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import bindRouter from './routes';
import logger from '@services/Logger';


// Init express
const app = express();

// Init database ORM
require('./database');

// Set basic express settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
bindRouter(app);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

// Export express instance
export default app;