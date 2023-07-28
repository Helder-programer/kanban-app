import { Model, DataType, Table, Column, ForeignKey } from "sequelize-typescript";
import { ITask } from "./types/ITask";

@Table({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'tb_tasks',
})
export default class Task extends Model implements ITask {
    @Column({
        primaryKey: true,
        type: DataType.CHAR
    })
    declare task_id: string;

    @Column(DataType.STRING)
    declare title: string;

    @Column(DataType.STRING)
    declare content: string;

    @Column(DataType.INTEGER)
    declare position: number;

    @Column(DataType.STRING)
    declare color: string;

    @Column(DataType.DATE)
    declare created_at: Date;
    @Column(DataType.DATE)
    declare updated_at: Date;
}