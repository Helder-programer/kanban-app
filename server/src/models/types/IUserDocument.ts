import { Document } from "mongoose";

export interface IUserDocument extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isCorrectPassword(password: string): Promise<boolean>;
}