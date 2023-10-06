const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const isActive = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role == "driver") {
    }

    next();
  } catch (error) {
    next(new ForbiddenError(error.message));
  }
};

module.exports = isActive;
