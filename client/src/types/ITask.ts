import { ISection } from "./ISection";

export interface ITask {
    _id: string;
    title: string;
    content: string;
    position: string;
    section: ISection;
    createdAt: string;
    updatedAt: string;
}