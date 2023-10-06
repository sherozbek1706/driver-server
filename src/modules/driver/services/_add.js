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

};

module.exports = add;
