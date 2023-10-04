/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("car_model").del();
  await knex("car_model").insert([
    {
      model: "Nexia 1",
    },
    {
      model: "Nexia 2",
    },
    {
      model: "Nexia 3",
    },
    {
      model: "Lacetti 1",
    },
    {
      model: "Lacetti 2",
    },
    {
      model: "Lacetti 3",
    },
    {
      model: "Cobalt 1",
    },
    {
      model: "Cobalt 2",
    },
    {
      model: "Cobalt 3",
    },
    {
      model: "Damas 1",
    },
  ]);
};
