import { ITask } from "../../../models/types/ITask";

export interface IUpdateTasksPositionsDTO {
    sourceSectionId: string;
    destinationSectionId: string;
    sourceTasksList: ITask[];
    destinationTasksList: ITask[];
}