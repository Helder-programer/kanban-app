
export interface ITask {
    task_id: string;
    title: string;
    content: string;
    position: number;
    section: string;
    color: string;
    created_at: Date;
    updated_at: Date;
}