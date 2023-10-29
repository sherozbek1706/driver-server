/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("payment", (table) => {
    table.bigIncrements("id").primary();
    table.timestamp("payment_date").defaultTo(knex.fn.now()).notNullable();
    table.float("money").notNullable();
    table.float("action").notNullable();
    table.float("then_money").notNullable();
    table.float("old_balans").notNullable();
    table.float("new_balans").notNullable();
    table
      .integer("admin_id")
      .references("id")
      .inTable("admin")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table
      .integer("driver_id")
      .references("id")
      .inTable("driver")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("payment");
};
