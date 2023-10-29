const db = require("../../../db");
const config = require("../../../shared/config");
const { NotFoundError } = require("../../../shared/errors");

const pay = async ({ user, params, body }) => {
  const existing = await db("driver").where({ id: params.id }).first();

  if (!existing) {
    throw new NotFoundError("Haydovchi topilmadi!");
  }

  let payments = {
    money: +body.balanse,
    action: +config.payment.action,
    then_money: +body.balanse * +config.payment.action,
    old_balans: +existing.balans,
    new_balans: +existing.balans + +body.balanse * +config.payment.action,
    admin_id: +user.id,
    driver_id: +params.id,
  };

  await db("payment").insert({ ...payments });

  return db("driver")
    .where({ id: params.id })
    .update({ balans: payments.new_balans });
};

module.exports = pay;
