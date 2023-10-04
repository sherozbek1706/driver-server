const db = require("../../../db");

const add = async ({ body }) => {
  return db("car_model").insert(body).returning("*");
};
module.exports = add;
