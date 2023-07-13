import { Types } from "mongoose";

export interface ICreateTaskDTO {
    sectionId: Types.ObjectId | string;
}