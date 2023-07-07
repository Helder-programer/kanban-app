import { Types } from "mongoose";

export interface IFindOneDTO {
    userId: Types.ObjectId | string;
    boardId: string;
}