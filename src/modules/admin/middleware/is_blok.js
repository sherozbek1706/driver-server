const db = require("../../../db");
const { ForbiddenError } = require("../../../shared/errors");

const isBlock = async (req, res, next) => {
  try {
    const user = req.user;

    const active = await db("admin")
      .where({ id: user.id, is_deleted: false })
      .first();

    if (!active) {
      throw new ForbiddenError(`Ushbu admin hozirda blok holatida!`);
    }

    next();
  } catch (error) {
    next(new ForbiddenError(error.message));
  }
};

module.exports = isBlock;
