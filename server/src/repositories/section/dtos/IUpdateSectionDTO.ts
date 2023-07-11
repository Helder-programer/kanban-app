import { Types } from "mongoose";

export interface IUpdateSectionDTO {
    userId: Types.ObjectId | string;
    boardId: Types.ObjectId | string;
    sectionId: Types.ObjectId | string;
    title?: string;
}