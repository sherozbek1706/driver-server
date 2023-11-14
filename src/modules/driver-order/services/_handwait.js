const db = require("../../../db");
const config = require("../../../shared/config");
const {
  NotFoundError,
  BadRequestError,
} = require("../../../shared/errors");

const handwait = async ({ params, user }) => {
  const existing = await db("driver-order")
    .where({ id: params.id, driver_id: user.id })
    .first();

  if (!existing) {
    throw new NotFoundError("Bunday zakazni siz qabul qilmagansiz.");
  }

  const order = await db("order").where({ id: existing.order_id }).first();

  let driver = await db("driver").where({ id: user.id }).first();

  const existed = await db("order")
    .where({ id: order.id, status: "close" })
    .first();

  if (existed) {
    throw new BadRequestError("Siz allaqachon bu zakazni bajarib bo'lgangiz.");
  }

  await db("order").where({ id: order.id }).update({ status: "wait" });

  return { msg: "Siz manzilga yetib keldingiz!" };
};

module.exports = handwait;
