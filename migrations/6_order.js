/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("order", function (table) {
    table.increments("id").primary();
    table
      .integer("address_id")
      .references("id")
      .inTable("address")
      .notNullable();
    table.string("phone_number").unique().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("admin_id").references("id").inTable("admin").notNullable();
    table.boolean("open").defaultTo(true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("order");
};
