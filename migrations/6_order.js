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
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table.string("phone_number").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("admin_id")
      .references("id")
      .inTable("admin")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table.enu("status", ["open", "close", "progress"]).defaultTo("open");
    table.string("district").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("order");
};
