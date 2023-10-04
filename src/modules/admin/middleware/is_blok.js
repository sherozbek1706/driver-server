const db = require("../../../db");
const { ForbiddenError } = require("../../../shared/errors");

const isBlock = async (req, res, next) => {
  try {
    const user = req.user;

    const block = await db("admin")
      .where({ id: user.id, is_deleted: false })
      .first();

    if (!block) {
      throw new ForbiddenError(`Ushbu admin hozirda blok holatida!`);
    }

    const active = await db("admin")
      .where({ id: user.id, is_deleted: false, active: true })
      .first();

    if (!active) {
      throw new ForbiddenError(`Ushbu admin hozirda active holatida emas!`);
    }

    next();
  } catch (error) {
    next(new ForbiddenError(error.message));
  }
};

module.exports = isBlock;
