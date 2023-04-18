import Knex from "knex";

const { DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const knex = Knex({
  client: "postgresql",
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    password: DB_PASSWORD,
    user: DB_USER,
    database: DB_NAME,
  },
});

// Make sure DB connected
export async function onDbConnect() {
  return knex.raw("SELECT 1");
}

export default knex;
