import { ISection } from "./ISection";

export interface ITask {
    task_id: string;
    title: string;
    content: string;
    position: number;
    color: string;
    created_at: Date;
    updated_at: Date;
    section_id: string;
    section?: ISection;
}