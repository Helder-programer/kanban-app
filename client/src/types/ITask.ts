import { ISection } from "./ISection";

export interface ITask {
    task_id: string;
    title: string;
    content: string;
    color: string;
    position: string;
    created_at: string;
    updated_at: string;
    section_id: string;
    section?: ISection;
}