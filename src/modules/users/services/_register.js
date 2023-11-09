const db = require("../../../db");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../../../shared/errors");
const { hash } = require("bcryptjs");
const config = require("../../../shared/config");
module.exports = async ({ body, image }) => {
  const { phone_number, password, ...data } = body;

  let existing = await db("users").where({ phone_number }).first();

  if (existing) {
    throw new BadRequestError("Telefon raqam oldin ro'yxatdan o'tgan");
  }

  let hashed_psw = await hash(password, 10);

  let user = await setUser({
    ...data,
    phone_number,
    password: hashed_psw,
    image,
  });

  let token = jwt.sign(
    { user: { id: user[0].id, role: "user" } },
    config.jwt.secret,
    { expiresIn: config.jwt.expirec_in }
  );

  return { data: user, token };
};

const setUser = async (data) => {
  return db("users").insert(data).returning("*");
};
