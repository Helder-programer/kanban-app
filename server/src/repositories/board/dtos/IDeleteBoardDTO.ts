import { Types } from "mongoose";

export interface IDeleteBoardDTO {
    boardId: Types.ObjectId | string;
    userId: Types.ObjectId | string;
}