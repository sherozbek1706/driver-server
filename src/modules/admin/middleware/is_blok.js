const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const isBlock = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role == "admin" || user.role == "super_admin") {
      const isnot = await db("admin").where({ id: user.id }).first();

      if (!isnot) {
        throw new NotFoundError(`Login qilgan admin topilmadi!`);
      }

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
    }

    next();
  } catch (error) {
    next(new ForbiddenError(error.message));
  }
};

module.exports = isBlock;
