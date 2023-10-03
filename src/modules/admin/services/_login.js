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


};

module.exports = login;
