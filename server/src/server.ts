import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import { errorMiddleware } from './middlewares/error';
import usersRouter from './routes/users';
import './database';
import { IUserDocument } from './models/types/IUserDocument';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);


app.use(errorMiddleware);

declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument | null;
        }
    }
}


app.listen(8000, () => {
    console.log('Servidor Rodando');
});
