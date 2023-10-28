const db = require("../../../db");
const { BadRequestError, NotFoundError } = require("../../../shared/errors");
const bcryptjs = require("bcryptjs");

const add = async ({ body, image, user }) => {
  const { car_id, phone_number, username, password } = body;

  let existing;

  existing = await db("driver").where({ username }).first();

  if (existing) {
    throw new BadRequestError("Username oldin ro'yxatdan o'tgan!");
  }

  existing = await db("driver").where({ phone_number }).first();

  if (existing) {
    throw new BadRequestError("Telefon raqam oldin ro'yxatdan o'tgan!");
  }
  existing = await db("car").where({ id: car_id }).first();

  if (!existing) {
    throw new NotFoundError("Mashina topilmadi!");
  }

  const hashed_psw = await bcryptjs.hash(password, 10);

  const admin_id = user.id;

  return db("driver")
    .insert({
      ...body,
      image,
      password: hashed_psw,
      admin_id,
      // created_at: new Date("2023-10-23").toISOString(),
    })
    .returning("*");
};

module.exports = add;
