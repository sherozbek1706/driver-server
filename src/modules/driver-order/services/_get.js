const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const get = async ({ params, user }) => {
  const existing = await db("order")
    .where({ id: params.id, status: "open" })
    .first();

  if (!existing) {
    throw new NotFoundError("Zakaz topilmadi");
  }

};

module.exports = get;
