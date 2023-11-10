const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const checkUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role == "user") {
      const isnot = await db("users").where({ id: user.id }).first();

      if (!isnot) {
        throw new NotFoundError(`User topilmadi!`);
      }

    }

    next();
  } catch (error) {
    next(new ForbiddenError(error.message));
  }
};

module.exports = checkUser;
