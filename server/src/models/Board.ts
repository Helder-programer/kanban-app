import { Model, DataType, Table, Column, HasMany, BelongsTo, ForeignKey, AfterCreate } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

import Section from "./Section";
import User from "./User";
import { IBoard } from "./types/IBoard";
import { ISection } from "./types/ISection";
import { IUser } from "./types/IUser";


@Table({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'tb_boards',
})
export default class Board extends Model<Partial<IBoard>> implements IBoard {

    @Column({
        primaryKey: true,
        type: DataType.CHAR
    })
    declare board_id: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '📝'
    })
    declare icon: string;

    @Column({
        type: DataType.STRING,
        defaultValue: 'Untitled'
    })
    declare title: string;

    @Column({
        type: DataType.STRING,
        defaultValue: 'Add description here...'
    })
    declare description: string;

    @Column(DataType.INTEGER)
    declare position: number;

    @Column({
        type: DataType.TINYINT,
        defaultValue: 0
    })
    declare favorite: boolean;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    declare favorite_position: number;

    @Column(DataType.DATE)
    declare created_at: Date;

    @Column(DataType.DATE)
    declare updated_at: Date;

    @ForeignKey(() => User)
    @Column(DataType.CHAR)
    declare user_id: string;

    @HasMany(() => Section, 'board_id')
    declare sections: ISection[];

    @BelongsTo(() => User)
    declare user: IUser;



    @AfterCreate
    public static async createSections(instance: Board) {
        const sectionsTitles = ['No Status 📕', 'To Do 📚', 'In Progress 🚀', 'Finished 🏁'];

        for (const counter in sectionsTitles) {
            let sectionId = uuidv4();
            await Section.create({
                section_id: sectionId,
                board_id: instance.board_id,
                title: sectionsTitles[counter],
                position: Number(counter)
            });
        }
    }
}