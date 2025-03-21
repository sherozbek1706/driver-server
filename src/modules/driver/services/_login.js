const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../../../shared/config");
const bcryptjs = require("bcryptjs");

const login = async ({ body }) => {
  const { username, password } = body;
  const existing = await db("driver").where({ username }).first();

  if (!existing) {
    throw new NotFoundError("Username xato kiritildi!");
  }
  if (existing.is_deleted == true) {
    throw new ForbiddenError("Ushbu Haydovchi Bloklangan!");
  }

  const correct = await bcryptjs.compare(password, existing.password);

  if (!correct) {
    throw new ForbiddenError("Parol xato kiritildi!");
  }

  const payload = {
    user: {
      id: existing.id,
      role: "driver",
    },
  };

  return jsonwebtoken.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expirec_in,
  });
};

module.exports = login;
