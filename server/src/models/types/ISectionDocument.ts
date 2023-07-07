import { Document, Types } from "mongoose";

export interface ISectionDocument extends Document {
    _id: Types.ObjectId | string;
    title: string;
    board: string;
    createdAt: Date;
    updatedAt: Date;
}