import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { Palabra } from "./entities/Palabra.entity";


dotenv.config();

const {DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env;
  
export const AppDataSource = new DataSource({
  type: "postgres",
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: false,
//logging logs sql command on the treminal
  logging:  true,
  entities: [Palabra],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});