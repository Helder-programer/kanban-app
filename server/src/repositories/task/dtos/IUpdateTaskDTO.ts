import { Types } from "mongoose";

export interface IUpdateTaskDTO {
    taskId: Types.ObjectId | string;
    title: string;
    content: string;
}