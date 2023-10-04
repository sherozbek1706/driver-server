const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const edit = async ({ params, body }) => {
  const existing = await db("car_model").where({ id: params.id }).first();

  if (!existing) {
    throw new NotFoundError("Car Model topilmadi!");
  }

  return db("car_model").where({ id: params.id }).update(body).returning("*");
};

module.exports = edit;
