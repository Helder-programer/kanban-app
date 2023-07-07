import { Document, Types } from "mongoose";

export interface IUserDocument extends Document {
    _id: Types.ObjectId | string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isCorrectPassword(password: string): Promise<boolean>;
}