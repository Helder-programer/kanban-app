import { Request, Response, NextFunction, json } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../helpers/apiErrors';
import { UserRepository } from '../repositories/user/UserRepository';


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userRepository = new UserRepository();
    const token = req.headers['authorization'];
    if (!token) throw new UnauthorizedError('Unauthorized: No token provided!');


        jwt.verify(token, process.env.TOKEN_SECRET_KEY!, (err, decoded: any) => {
            if (err) throw new UnauthorizedError('Unauthorized: Invalid token!');
            userRepository.findById(decoded.id).then(user => {
                req.user = user;
                next();
            });
        });

}