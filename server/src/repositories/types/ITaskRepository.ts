import { ITaskDocument } from "../../models/types/ITaskDocument";
import { ICreateTaskDTO } from "../task/dtos/ICreateTaskDTO";

export interface ITaskRepository {
    create(data: ICreateTaskDTO): Promise<ITaskDocument>;
}