const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const remove = async ({ params }) => {
  const existing = await db("driver")
    .where({ ...params, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Haydovchi topilmadi!");
  }

  return db("driver")
    .where(params)
    .update({ active: false, is_deleted: true })
    .returning("*");
};

module.exports = remove;
