const db = require("../../../db");

const add = async ({ body }) => {
  return db("address").insert(body).returning("*");
};
module.exports = add;
