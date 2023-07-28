import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import './database';

import { errorMiddleware } from './middlewares/error';
import { IUser } from './models/types/IUser';
import usersRouter from './routes/users';
import boardsRouter from './routes/boards';
import sectionsRouter from './routes/sections';
import tasksRouter from './routes/tasks';
import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/boards', boardsRouter);
app.use('/boards/:boardId/sections', sectionsRouter);
app.use('/boards/:boardId/tasks', tasksRouter);


app.use(errorMiddleware);

declare global {
    namespace Express {
        interface Request {
            user?: IUser | null;
        }
    }
}


app.listen(8000, () => {
    console.log('Servidor Rodando');
});
