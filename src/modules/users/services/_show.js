const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");
module.exports = async ({ user }) => {
  const existing = await db("users").where({ id: user.id }).first();

  if (!existing) {
    throw new NotFoundError("Foydalanuvchi topilmadi!");
  }

  return existing;
};
