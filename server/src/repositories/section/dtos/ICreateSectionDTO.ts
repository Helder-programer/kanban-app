import { Types } from "mongoose";

export interface ICreateSectionDTO {
    boardId: Types.ObjectId | string;
}