const db = require("../../../db");
const { BadRequestError, NotFoundError } = require("../../../shared/errors");

const edit = async ({ params, body }) => {
  const existing = await db("car_region").where({ id: params.id });

  if (!existing) {
    throw new NotFoundError("Car Region topilmadi!");
  }

  const existed = await db("car_region").where({ number: body.number }).first();

  if (existed) {
    throw new BadRequestError("Bunday raqam oldin ro'yxatdan o'tgan!");
  }

  return db("car_region").where({ id: params.id }).update(body).returning("*");
};

module.exports = edit;
