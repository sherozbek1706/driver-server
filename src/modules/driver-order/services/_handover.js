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

  const existed = await db("order")
    .where({ id: params.id, status: "close" })
    .first();

  if (existed) {
    throw new BadRequestError("Siz allaqachon bu zakazni bajarib bo'lgangiz.");
  }

  await db("order").where({ id: params.id }).update({ status: "close" });

  return { msg: "Muvvaffaqiyatli yakunladingiz." };
};

module.exports = handover;
