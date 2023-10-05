const db = require("../../../db");
const { NotFoundError, BadRequestError } = require("../../../shared/errors");

const add = async ({ body }) => {
  const { model_id, region_id, number } = body;
  let existing;

  existing = await db("car_model").where({ id: model_id }).first();

  if (!existing) {
    throw new NotFoundError("Model topilmadi!");
  }

  existing = await db("car_region").where({ id: region_id }).first();

  if (!existing) {
    throw new NotFoundError("Viloyat topilmadi!");
  }

  let existed = await db("car").where({ number }).first();

  if (existed) {
    throw new BadRequestError("Bunday raqam oldin ro'yxatdan o'tgan!");
  }

  return db("car").insert(body).returning("*");
};

module.exports = add;
