const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const onActive = async ({ params }) => {
  let existing = await db("driver")
    .where({ id: params.id, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Haydovchi topilmadi!");
  }

  return db("driver")
    .where({ id: params.id })
    .update({ active: true })
    .returning("*");
};

module.exports = onActive;
