import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").unique().notNullable();
      table.text("password").notNullable();
      table.timestamps(true, true, true);
    })
    .createTable("urls", (table) => {
      table.string("id").primary();
      table.text("url").notNullable();
      table
        .integer("userId")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamps(true, true, true);
    })
    .createTable("visits", (table) => {
      table.increments("id").primary();
      table
        .string("urlId")
        .references("id")
        .inTable("urls")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamps(true, true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("visits").dropTable("urls").dropTable("users");
}
