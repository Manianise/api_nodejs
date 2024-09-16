import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize({
  dialect: 'mariadb',
  dialectOptions: {
    database: !process.env.DB_NAME ? 'default_db' : process.env.DB_NAME,
    user: !process.env.DB_USER ? 'root' : process.env.DB_USER,
    password: !process.env.DB_PASSWORD ? null : process.env.DB_PASSWORD,
    host: !process.env.DB_HOST ? 'localhost' : process.env.DB_HOST,
    port: !process.env.DB_PORT ? '3306' : process.env.DB_NAME,
    showWarnings: true,
    connectTimeout: 2000
  }
});