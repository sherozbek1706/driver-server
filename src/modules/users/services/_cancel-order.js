const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");
const cancel = async ({ user }) => {
  let order = await db("order")
    .where({ user_id: user.id, status: "open" })
    .first();

  if (!order) {
    throw new NotFoundError("Buyurtma topilmadi!");
  }

  return db("order")
    .where({ user_id: user.id, status: "open" })
    .update({ status: "close" })
    .returning("*");
};

module.exports = cancel;
