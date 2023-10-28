/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("driver", (table) => {
    table.increments("id").primary();
    table.string("first_name", 64).notNullable();
    table.string("last_name", 64).notNullable();
    table.integer("age").notNullable();
    table.string("image", 320).notNullable();
    table.string("address").notNullable();
    table.string("phone_number").unique().notNullable();
    table.boolean("active").defaultTo(false);
    table
      .integer("admin_id")
      .references("id")
      .inTable("admin")
      .onDelete("SET NULL")
    table
      .integer("car_id")
      .references("id")
      .inTable("car")
      .onDelete("CASCADE")
    table.string("username", 64).notNullable().unique();
    table.string("password").notNullable();
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("driver");
};
