const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const unremove = async ({ params }) => {
  return db("driver")
    .where(params)
    .update({ active: false, is_deleted: false })
    .returning("*");
};

module.exports = unremove;
