const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const offActive = async ({ params }) => {
  return db("driver")
    .where({ id: params.id })
    .update({ active: false })
    .returning("*");
};

module.exports = offActive;
