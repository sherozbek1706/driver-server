const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../../../shared/config");

const login = async ({ body }) => {
  const { username, password } = body;
  const existing = await db("admin").where({ username }).first();

  if (!existing) {
    throw new NotFoundError("Username xato kiritildi!");
  }

  const correct = existing.password == password;

  if (!correct) {
    throw new ForbiddenError("Password xato kiritildi!");
  }

  const payload = {
    user: {
      id: existing.id,
      role: existing.role,
    },
  };

  return jsonwebtoken.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expirec_in,
  });
};

module.exports = login;
