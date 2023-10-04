const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const off_active = async ({ params, user, role }) => {
  let existing = await db("admin")
    .where({ id: params.id, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Admin topilmadi!");
  }

  if (existing.id != user.id) {
    if (role != "super_admin") {
      throw new ForbiddenError("Sizda bunday huquq yo'q!");
    }
  }

  if (existing.id == user.id && role == "super_admin") {
    throw new ForbiddenError(
      "Super Admin o'zini active'siz qilishi mumkin emas!"
    );
  }

  return db("admin")
    .where({ id: params.id })
    .update({ active: false })
    .returning("*");
};

module.exports = off_active;
