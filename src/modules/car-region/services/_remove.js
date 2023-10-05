const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const remove = async ({ params }) => {
  const existing = await db("car_region").where({ id: params.id });

  if (!existing) {
    throw new NotFoundError("Car Region topilmadi!");
  }

  return db("car_region").where({ id: params.id }).del().returning("*");
};

module.exports = remove;
