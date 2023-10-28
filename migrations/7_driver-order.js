/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("driver-order", function (table) {
    table.increments("id").primary();
    table
      .integer("driver_id")
      .references("id")
      .inTable("driver")
      .onDelete("SET NULL");
    table
      .integer("order_id")
      .references("id")
      .inTable("order")
      .onDelete("CASCADE");
    table.timestamp("time").notNullable();
    table.boolean("paid").defaultTo(false);
    table.timestamp("paid_time").defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("driver-order");
};
