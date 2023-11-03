const db = require("../../../db");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../../../shared/errors");
const { hash } = require("bcryptjs");
const config = require("../../../shared/config");
module.exports = async ({ body, image }) => {
  const { phone_number, password, ...data } = body;

  let existing = await db("users").where({ phone_number }).first();

  console.log(await db("users").select());
  if (existing) {
    throw new BadRequestError("Telefon raqam oldin ro'yxatdan o'tgan");
  }

  let hashed_psw = await hash(password, 10);

  let user = await db("users")
    .insert({
      ...data,
      phone_number,
      password: hashed_psw,
      image,
    })
    .returning("*");

  let token = jwt.sign(
    { user: { id: user.id, role: "client" } },
    config.jwt.secret,
    { expiresIn: config.jwt.expirec_in }
  );

  return { data: user, token };
};
