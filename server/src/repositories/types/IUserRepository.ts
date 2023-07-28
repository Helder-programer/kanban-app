import { IUserDocument } from "../../models/types/IUser";
import { ICreateUserDTO } from "../user/dtos/ICreateUserDTO";

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<IUserDocument | null>;
    findById(id: string): Promise<IUserDocument>;
}