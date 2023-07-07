import { Types } from "mongoose";

export interface ICountBoardsDTO {
    userId: Types.ObjectId | string;
}