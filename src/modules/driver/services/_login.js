const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../../../shared/config");
const bcryptjs = require("bcryptjs");

const login = async ({ body }) => {
  const { username, password } = body;
  const existing = await db("driver")
    .where({ username, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Username xato kiritildi!");
  }
};

module.exports = login;
