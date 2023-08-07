import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ITask } from "./types/ITask";
import Section from "./Section";
import { ISection } from "./types/ISection";

@Table({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'tb_tasks',
})
export default class Task extends Model<Partial<ITask>> implements ITask {
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

    @Column({
        type: DataType.STRING,
        defaultValue: '#EEE'
    })
    declare color: string;

    @Column(DataType.DATE)
    declare created_at: Date;

    @Column(DataType.DATE)
    declare updated_at: Date;

    @ForeignKey(() => Section)
    @Column(DataType.CHAR)
    declare section_id: string;

    @BelongsTo(() => Section, 'section_id')
    declare section: ISection;
}