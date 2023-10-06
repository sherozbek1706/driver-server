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

};

module.exports = edit;
