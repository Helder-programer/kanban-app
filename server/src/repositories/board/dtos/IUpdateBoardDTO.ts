import { Types } from "mongoose";

export interface IUpdateBoardDTO {
    boardId: Types.ObjectId | string;
    userId: Types.ObjectId | string;
    title: string;
    description: string;
    favorite: boolean;
    icon: string;
}