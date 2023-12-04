const { hashSync } = require("bcryptjs");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("admin").del();
  await knex("admin").insert([
    {
      first_name: "She'rozbek",
      last_name: "Baxtiyorov",
      age: 20,
      image: "/files/admin/sherozbek.jpg",
      address: "Toshkent, Chilonzor 22 kv, 16 dom, 12 xonadon",
      phone_number: "+998938340617",
      role: "super_admin",
      username: "sherozbek.17",
      password: hashSync("1234", 10),
    },
  ]);
};
