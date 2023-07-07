import { Types } from "mongoose";

export interface IFindAllDTO {
    userId: Types.ObjectId | string;
}