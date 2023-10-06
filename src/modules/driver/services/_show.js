const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const show = async ({ params, user, role }) => {
  let existing = await db("driver")
    .where({ id: params.id, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Haydovchi topilmadi!");
  }

  return existing;
};

module.exports = show;
