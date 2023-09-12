import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories/user/UserRepository';


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userRepository = new UserRepository();
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({message: 'Unauthorized: No token provided!'});

    jwt.verify(token, process.env.TOKEN_SECRET_KEY!, (err, decoded: any) => {
        if (err) return res.status(401).json({ message: 'Unauthorized: Invalid token!' });

        userRepository.findById(decoded.id).then(user => {
            req.user = user;
            next();
        });
    });

}