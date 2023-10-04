const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const unremove = async ({ params, user }) => {
  const existing = await db("admin")
    .where({ ...params, is_deleted: true })
    .first();

  if (!existing) {
    throw new NotFoundError("Admin topilmadi!");
  }

  if (existing.id == user.id) {
    throw new ForbiddenError("Super Admin o'zini qayta tiklashi mumkin emas!");
  }

module.exports = unremove;
