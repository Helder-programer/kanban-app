import { IUser } from "../../models/types/IUser";
import { ICreateUserDTO } from "../user/dtos/ICreateUserDTO";

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser>;
}