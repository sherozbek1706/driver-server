const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const remove = async ({ params }) => {
  const existing = await db("address").where({ id: params.id }).first();

  if (!existing) {
    throw new NotFoundError("Manzil topilmadi!");
  }

  return db("address").where({ id: params.id }).del().returning("*");
};
module.exports = remove;
