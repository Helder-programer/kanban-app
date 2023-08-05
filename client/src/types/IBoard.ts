import { ISection } from "./ISection";
import { IUser } from "./IUser";

export interface IBoard {
    board_id: string;
    icon: string;
    title: string;
    description: string;
    position: number;
    favorite: boolean;
    favorite_position: number;
    created_at: string;
    updated_at: string;
    user_id: string;
    sections: ISection[];
    user?: IUser;
}