import { IUserRepository } from "../types/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import User from "../../models/User";
import { BadRequestError, NotFoundError } from "../../helpers/apiErrors";
import { IUserDocument } from "../../models/types/IUser";



export class UserRepository implements IUserRepository {

    public async create({ name, email, password }: ICreateUserDTO) {
        const userToValidate = await User.findOne({ email });
        if (userToValidate) throw new BadRequestError('Email already exists!');

        const user = new User({ name, email, password });
        await user.save();
    }

    public async findByEmail(email: string): Promise<IUserDocument> {
        const searchedUser = await User.findOne({ email });
        return searchedUser!;
    }

    public async findById(id: string) {
        const user = await User.findById(id);
        if (!user) throw new NotFoundError('User not found!');
        return user;
    }
}