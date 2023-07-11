import { Types } from "mongoose";

export interface IDeleteSectionDTO {
    userId: Types.ObjectId | string;
    boardId: Types.ObjectId | string;
    sectionId: Types.ObjectId | string;
}