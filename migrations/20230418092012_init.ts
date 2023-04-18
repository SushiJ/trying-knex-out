import { Knex } from "knex";
import { nanoid } from "nanoid";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").unique().notNullable();
      table.text("password").notNullable();
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable();
    })
    .createTable("urls", (table) => {
      table.string("id", 10).primary().defaultTo(nanoid);
      table.text("url").notNullable();
      table
        .integer("userId")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable();
    })
    .createTable("visits", (table) => {
      table.increments("id").primary();
      table
        .string("urlId")
        .references("id")
        .inTable("urls")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("visits").dropTable("urls").dropTable("users");
}
