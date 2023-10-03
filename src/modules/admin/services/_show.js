const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const show = async ({ params, user, role }) => {
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

  return existing;
};

module.exports = show;
