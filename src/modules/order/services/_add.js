const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const add = async ({ body, user }) => {
  const { address_id } = body;

  const existed = await db("address").where({ id: address_id }).first();

  if (!existed) {
    throw new NotFoundError("Manzil topilmadi!");
  }

  return db("order")
    .insert({ ...body, admin_id: user.id })
    .returning("*");
};

module.exports = add;
