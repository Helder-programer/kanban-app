import { ITask } from "./ITask";

export interface ISection {
    _id: string;
    title: string;
    board: string;
    tasks: ITask[];
    createdAt: string;
    updatedAt: string;
}