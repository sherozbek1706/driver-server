const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const edit = async ({ params, body }) => {
  const existing = await db("address").where({ id: params.id }).first();

  if (!existing) {
    throw new NotFoundError("Manzil topilmadi!");
  }

  return db("address").where({ id: params.id }).update(body).returning("*");
};

module.exports = edit;
