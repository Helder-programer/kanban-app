import { Types } from "mongoose";

export interface ICreateBoardDTO {
    userId: Types.ObjectId | string;
}