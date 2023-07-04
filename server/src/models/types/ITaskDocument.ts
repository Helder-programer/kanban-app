import { Document, Types } from "mongoose";

export interface ITaskDocument extends Document {
    _id: Types.ObjectId;
    title: string;
    content: string;
    position: number;
    section: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}