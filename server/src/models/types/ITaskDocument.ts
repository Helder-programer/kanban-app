import { Document, Types } from "mongoose";

export interface ITaskDocument extends Document {
    _id: Types.ObjectId | string;
    title: string;
    content: string;
    position: number;
    section: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}