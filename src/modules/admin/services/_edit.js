const db = require("../../../db");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../../../shared/errors");
const bcryptjs = require("bcryptjs");

const edit = async ({ params, user, role, body, image }) => {
  let existing = await db("admin")
    .where({ id: params.id, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Admin topilmadi!");
  }

  if (existing.id != user.id) {
    if (role != "super_admin") {
      throw new ForbiddenError("Sizda bunday huquq yo'q!");
    }
  }

  // admin yab boraman birdaniga
  let admin = {};

  // agar oldin ro'yxatdan o'tgan bo'lsa elon qilaman.
  let existed;

  // tekshirib olish uchun ishlatdim.
  const { phone_number, username, role: admin_role, password, ...data } = body;

  existed = await db("admin").where({ username }).first();

  if (existed && existed.username != existing.username) {
    throw new BadRequestError("Username oldin ro'yxatdan o'tgan!");
  }

  existed = await db("admin").where({ phone_number }).first();

  if (existed && existed.phone_number != existing.phone_number) {
    throw new BadRequestError("Telefon raqam oldin ro'yxatdan o'tgan!");
  }

  admin = { username, phone_number, ...data, image };

  if (role == "super_admin") {
    let hashed_psw = await bcryptjs.hash(password, 10);
    admin = { ...admin, role: admin_role, password: hashed_psw };
    return db("admin").where({ id: params.id }).update(admin).returning("*");
  }

  admin = { ...admin, role, password: existing.password };
  return db("admin").where({ id: params.id }).update(admin).returning("*");
};

module.exports = edit;
