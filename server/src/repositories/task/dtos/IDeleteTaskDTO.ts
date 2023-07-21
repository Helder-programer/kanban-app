import { Types } from "mongoose";

export interface IDeleteTaskDTO {
    boardId: Types.ObjectId | string;
    taskId: Types.ObjectId | string;
}