const db = require("../../../db");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../../../shared/errors");

const paid = async ({ params }) => {
  const orderdriver = await db("driver-order").where({ id: params.id }).first();

  if (!orderdriver) {
    throw new NotFoundError("Order Not Found!");
  }

  await db("driver-order")
    .where({ id: params.id })
    .update({ paid: true, paid_time: new Date().toISOString() });

  return orderdriver;
};

module.exports = paid;
