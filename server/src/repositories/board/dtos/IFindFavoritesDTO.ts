import { Types } from "mongoose";

export interface IFindFavoritesDTO {
    userId: Types.ObjectId | string;
    boardId?: Types.ObjectId | string;
}