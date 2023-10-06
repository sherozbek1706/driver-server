const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const unremove = async ({ params }) => {
  const existing = await db("driver")
    .where({ ...params, is_deleted: true })
    .first();

  if (!existing) {
    throw new NotFoundError("Haydovchi topilmadi!");
  }

  return db("driver")
    .where(params)
    .update({ active: false, is_deleted: false })
    .returning("*");
};

module.exports = unremove;
