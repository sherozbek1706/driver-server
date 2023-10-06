const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const isActive = async (req, res, next) => {
  try {

    next();
  } catch (error) {
    next(new ForbiddenError(error.message));
  }
};

module.exports = isActive;
