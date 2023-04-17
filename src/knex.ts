import Knex from "knex";

const knex = Knex({
  client: "postgresql",
  connection: process.env.DB_URL,
});

// Make sure DB connected
export async function onDbConnect() {
  return knex.raw("SELECT 1");
}

export default knex;
