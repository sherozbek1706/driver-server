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

};

module.exports = edit;
