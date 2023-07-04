import { Types, Document } from "mongoose";

export interface IBoardDocument extends Document {
    _id: Types.ObjectId;
    icon: string;
    title: string;
    description: string;
    position: number;
    favorite: boolean;
    favoritePosition: number;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}