/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("car_region").del();
  await knex("car_region").insert([
    {
      region: "Samarqand",
      number: "30",
    },
    {
      region: "Toshkent",
      number: "01",
    },
    {
      region: "Toshkent viloyat",
      number: "10",
    },
    {
      region: "Qashqadaryo",
      number: "70",
    },
    {
      region: "Sirdaryo",
      number: "20",
    },
    {
      region: "Jizzax",
      number: "25",
    },
    {
      region: "Farg'ona",
      number: "40",
    },
    {
      region: "Andijon",
      number: "60",
    },
    {
      region: "Namangan",
      number: "50",
    },
    {
      region: "Surxandaryo",
      number: "75",
    },
    {
      region: "Buxoro",
      number: "80",
    },
    {
      region: "Navoiy",
      number: "85",
    },
    {
      region: "Xorazm",
      number: "90",
    },
    {
      region: "Qoraqalpog'iston",
      number: "95",
    },
  ]);
};
