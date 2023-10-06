const db = require("../../../db");
const { BadRequestError } = require("../../../shared/errors");
const bcryptjs = require("bcryptjs");

const add = async ({ body, image, user }) => {
  const { phone_number, username, password } = body;

  let existing;

  existing = await db("driver").where({ username }).first();

  if (existing) {
    throw new BadRequestError("Username oldin ro'yxatdan o'tgan!");
  }

  const hashed_psw = await bcryptjs.hash(password, 10);

  const admin_id = user.id;

  return db("driver")
    .insert({ ...body, image, password: hashed_psw, admin_id })
    .returning("*");
};

module.exports = add;
