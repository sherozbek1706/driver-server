const db = require("../../../db");
const { BadRequestError } = require("../../../shared/errors");
const bcryptjs = require("bcryptjs");

const add = async ({ body, image }) => {
  const { phone_number, username, password } = body;

  let existing;

  existing = await db("admin").where({ username }).first();

  if (existing) {
    throw new BadRequestError("Username oldin ro'yxatdan o'tgan!");
  }

  existing = await db("admin").where({ phone_number }).first();

  if (existing) {
    throw new BadRequestError("Telefon raqam oldin ro'yxatdan o'tgan!");
  }

  const hashed_psw = await bcryptjs.hash(password, 10);

  return db("admin")
    .insert({ ...body, image, password: hashed_psw })
    .returning("*");
};

module.exports = add;
