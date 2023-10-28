const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");
const remove = async ({ params }) => {
  const existing = await db("order").where({ id: params.id }).first();

  if (!existing) {
    throw new NotFoundError("Buyurtma topilmadi.");
  }

  const existed = await db("order")
    .where({ id: params.id, status: "close" })
    .first();

  if (existed) {
    throw new ForbiddenError("Buyurtmani o'chirish mumkin emas!");
  }

  await db("order").where({ id: params.id }).del();

  return "buyurma o'chirildi";
};
module.exports = remove;
