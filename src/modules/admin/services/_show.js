const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const show = async ({ params, user, role }) => {
  let existing = await db("admin")
    .where({ id: params.id, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Admin topilmadi!");
  }

};

module.exports = show;
