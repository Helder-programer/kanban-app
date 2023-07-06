import { Types, Document } from "mongoose";
import { ISectionDocument } from "./ISectionDocument";

export interface IBoardDocument extends Document {
    _id: Types.ObjectId;
    icon: string;
    title: string;
    description: string;
    position: number;
    favorite: boolean;
    favoritePosition: number;
    user: Types.ObjectId;
    sections: ISectionDocument[];
    createdAt: Date;
    updatedAt: Date;
}