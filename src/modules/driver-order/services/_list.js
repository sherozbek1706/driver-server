const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const list = async ({ user }) => {
  return db("driver-order").where({ driver_id: user.id });
};

module.exports = list;
