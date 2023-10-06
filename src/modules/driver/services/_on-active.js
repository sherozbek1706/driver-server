const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const onActive = async ({ params }) => {
  return db("driver")
    .where({ id: params.id })
    .update({ active: true })
    .returning("*");
};

module.exports = onActive;
