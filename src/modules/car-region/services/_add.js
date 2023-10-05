const db = require("../../../db");
const { BadRequestError } = require("../../../shared/errors");

const add = async ({ body }) => {
  const { number } = body;
  const existed = await db("car_region").where({ number }).first();

  if (existed) {
    throw new BadRequestError("Bunday raqam oldin ro'yxatdan o'tgan!");
  }

  return db("car_region").insert(body).returning("*");
};
module.exports = add;
  