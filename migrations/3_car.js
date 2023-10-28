/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("car", (table) => {
    table.increments("id").primary();
    table
      .integer("region_id")
      .references("id")
      .inTable("car_region")
      .onDelete("SET NULL");
    table
      .integer("model_id")
      .references("id")
      .inTable("car_model")
      .onDelete("SET NULL");
    table.string("number").notNullable().unique();
    table.integer("year").notNullable();
    table.string("color").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("car");
};
