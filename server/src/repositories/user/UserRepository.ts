import { v4 as uuidv4 } from "uuid";

import User from "../../models/User";
import { IUserRepository } from "../types/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import { BadRequestError, NotFoundError } from "../../helpers/apiErrors";
import { IUser } from "../../models/types/IUser";



export class UserRepository implements IUserRepository {

    public async create({ name, email, password }: ICreateUserDTO) {
        const userId = uuidv4();
        const userToValidate = await User.findOne({ where: { email } });
        if (userToValidate) throw new BadRequestError('Email already exists!');

        await User.create({ user_id: userId, name, email, password });
    }

    public async findByEmail(email: string) {
        const searchedUser = await User.findOne({ where: { email } });
        return searchedUser!;
    }

    public async findById(id: string) {
        const user = await User.findByPk(id);
        if (!user) throw new NotFoundError('User not found!');
        return user;
    }

    public async update({ userId, email, name, newPassword, oldPassword }: IUpdateUserDTO) {
        const userToUpdate = await this.findById(userId);

        let objectToUpdate: any = {};
        if (name != userToUpdate.name && name)
            objectToUpdate.name = name;

        if (email != userToUpdate.email && email)
            objectToUpdate.email = email;

        if (newPassword) {
            if (await userToUpdate.isCorrectPassword(oldPassword)) {
                objectToUpdate.password = newPassword;
            } else throw new BadRequestError('Incorrect old password!');
        }

        userToUpdate.set(objectToUpdate);
        await userToUpdate.save();

        return userToUpdate;
    }
}