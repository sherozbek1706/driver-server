/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("order", (table) => {
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table.enum("who", ["user", "admin"]).defaultTo("user");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("order", (table) => {
    table.dropColumn("user_id");
    table.dropColumn("who");
  })
};
