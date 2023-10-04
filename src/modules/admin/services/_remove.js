const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const remove = async ({ params, user }) => {
  const existing = await db("admin")
    .where({ ...params, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Admin topilmadi!");
  }

module.exports = remove;
