const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const remove = async ({ params }) => {
  const existed = await db("car").where({ id: params.id }).first();

  if (!existed) {
    throw new NotFoundError("Car topilmadi!");
  }

  return db("car").where({ id: params.id }).del().returning("*");
};

module.exports = remove;
