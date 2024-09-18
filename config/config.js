import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize({
  dialect: 'mariadb',
  dialectOptions: {
    database: !process.env.MARIADB_DATABASE ? 'default_db' : process.env.MARIADB_DATABASE,
    user: !process.env.MARIADB_USER ? 'root' : process.env.MARIADB_USER,
    password: !process.env.MARIADB_ROOT_PASSWORD ? null : process.env.MARIADB_ROOT_PASSWORD,
    host: !process.env.MARIADB_HOST ? 'localhost' : process.env.MARIADB_HOST,
    port: !process.env.MARIADB_PORT ? '3306' : process.env.MARIADB_PORT,
    showWarnings: true,
    connectTimeout: 2000
  }
});