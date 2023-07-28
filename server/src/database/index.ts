import { Sequelize } from "sequelize";
import dotEnv from 'dotenv';

dotEnv.config();

const connection = new Sequelize({
    dialect: 'mysql',
    database: 'db_hn_kanban',
    host: 'localhost',
    username: 'root',
    password: process.env.DB_PASSWORD,
    port: 3306,
    define: {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
});

export default connection;