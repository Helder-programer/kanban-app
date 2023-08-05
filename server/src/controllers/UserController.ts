import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { BadRequestError } from "../helpers/apiErrors";
import { IUserRepository } from "../repositories/types/IUserRepository";

export class UserController {
    constructor(
        private repository: IUserRepository
    ) {
        this.repository = repository;
    }


    public async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        await this.repository.create({ name, email, password });
        res.status(200).json({ message: 'User succesfully created!' });
    }

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await this.repository.findByEmail(email);

        if (!user || !await user.isCorrectPassword(password)) throw new BadRequestError('Incorrect Email or Password!');

        const token = jwt.sign(
            { id: user.user_id },
            process.env.TOKEN_SECRET_KEY!,
            { expiresIn: '24h' }
        );


        return res.status(200).json({ user, token });

    }

    public async recoverUserInformations(req: Request, res: Response) {
        const user = req.user;
        return res.status(200).json(user);
    }
}