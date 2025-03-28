import dotenv from 'dotenv';
dotenv.config();

export default {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
  pool: { min: 2, max: 10 },
};
