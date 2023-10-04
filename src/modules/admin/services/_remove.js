const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const remove = async ({ params, user }) => {
  const existing = await db("admin")
    .where({ ...params, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Admin topilmadi!");
  }

  if (existing.id == user.id) {
    throw new ForbiddenError("Super Admin o'zini o'chirishi mumkin emas!");
  }

  return db("admin")
    .where(params)
    .update({ active: false, is_deleted: true })
    .returning("*");
};

module.exports = remove;
