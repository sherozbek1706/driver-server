const db = require("../../../db");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../../../shared/errors");

const handover = async ({ params, user }) => {
  const existing = await db("driver-order")
    .where({ id: params.id, driver_id: user.id })
    .first();

  if (!existing) {
    throw new NotFoundError("Bunday zakazni siz qabul qilmagansiz.");
  }

};

module.exports = handover;
