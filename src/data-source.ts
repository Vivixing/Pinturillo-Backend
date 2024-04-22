import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Categoria } from "./entities/Categoria.entity";

dotenv.config();

const {DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;
  
export const AppDataSource = new DataSource({
  type: "postgres",
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
//logging logs sql command on the treminal
  logging:  true,
  entities: [Categoria],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});