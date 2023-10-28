const db = require("../../../db");
const config = require("../../../shared/config");
const { NotFoundError } = require("../../../shared/errors");

const pay = async ({ params, body }) => {
  const existing = await db("driver").where({ id: params.id }).first();

  if (!existing) {
    throw new NotFoundError("Haydovchi topilmadi!");
  }

  return db("driver")
    .where({ id: params.id })
    .update({
      balans: +existing.balans + +body.balanse * +config.payment.action,
    });
};

module.exports = pay;
