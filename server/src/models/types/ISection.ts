import { IBoard } from "./IBoard";
import { ITask } from "./ITask";

export interface ISection {
    section_id: string;
    title: string;
    created_at: Date;
    updated_at: Date;
    board_id: string;
    tasks: ITask[];
    board?: IBoard;
}