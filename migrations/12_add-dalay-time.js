/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("driver-order", (table) => {
      table.string("delay_time").notNullable()
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.alterTable("driver-order", (table) => {
      table.dropColumn("delay_time");
    });
  };
  