import "dotenv/config";
import type { Knex } from "knex";

// Update with your config settings.
// Install ts-node else it's gonna complain
const { DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const config: { [key: string]: Knex.Config } = {
  staging: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      password: DB_PASSWORD,
      user: DB_USER,
      database: DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "ts",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      password: DB_PASSWORD,
      user: DB_USER,
      database: DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      extension: "ts",
    },
  },
};

export default config;
