import { Types, Document } from "mongoose";

export interface ISectionDocument extends Document {
    _id: Types.ObjectId;
    title: string;
    board: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}