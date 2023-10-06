const db = require("../../../db");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../../../shared/errors");
const bcryptjs = require("bcryptjs");

const edit = async ({ params, user, body, image }) => {
  let existing = await db("driver")
    .where({ id: params.id, is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Haydovchi topilmadi!");
  }

  if (existing.id != user.id) {
    if (user.role == "driver") {
      throw new ForbiddenError("Sizda bunday huquq yo'q!");
    }
  }

  // haydovchi yasab boraman birdaniga
  let driver = {};

  // agar oldin ro'yxatdan o'tgan bo'lsa elon qilaman.
  let existed;

  // tekshirib olish uchun ishlatdim.
  const { phone_number, username, car_id, password, ...data } = body;

  existed = await db("driver").where({ username }).first();

  if (existed && existed.username != existing.username) {
    throw new BadRequestError("Username oldin ro'yxatdan o'tgan!");
  }

};

module.exports = edit;
