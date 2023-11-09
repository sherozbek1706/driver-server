const db = require("../../../db");
const config = require("../../../shared/config");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = async ({ body }) => {
  const existing = await db("users")
    .where({ phone_number: body.phone_number })
    .first();

  if (!existing) {
    throw new NotFoundError("Foydalanuvchi topilmadi");
  }

  const compare = await bcryptjs.compare(body.password, existing.password);

  if (!compare) {
    throw new ForbiddenError("Parol noto'g'ri kiritildi!");
  }

  let token = jwt.sign(
    { user: { id: existing.id, role: "user" } },
    config.jwt.secret,
    { expiresIn: config.jwt.expirec_in }
  );

  return { token };
};
