/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("driver-msg", (table) => {
    table.increments("id").primary();
    table.string("msg").notNullable();
    table
      .integer("driver_id")
      .references("id")
      .inTable("driver")
      .onDelete("SET NULL");
    table.enum("type", ["message", "notification"]).defaultTo("message");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("driver-msg");
};
