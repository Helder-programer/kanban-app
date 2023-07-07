import { Document, Types } from "mongoose";

export interface IBoardDocument extends Document {
    _id: Types.ObjectId | string;
    icon: string;
    title: string;
    description: string;
    position: number;
    favorite: boolean;
    favoritePosition: number;
    user: Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
}