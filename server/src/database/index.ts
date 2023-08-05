import { Sequelize } from "sequelize-typescript";
import dotEnv from 'dotenv';
import Board from "../models/Board";
import User from "../models/User";
import Section from "../models/Section";
import Task from "../models/Task";

dotEnv.config();

const connection = new Sequelize({
    dialect: 'mysql',
    database: 'db_hn_kanban',
    host: 'localhost',
    username: 'root',
    password: process.env.DB_PASSWORD,
    port: 3306,
    define: {
        timestamps: true,
        freezeTableName: true,
    },
    models: [Board, User, Section, Task]
});

export default connection;