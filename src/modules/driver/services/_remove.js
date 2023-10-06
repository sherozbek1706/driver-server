const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const remove = async ({ params }) => {


  return db("driver")
    .where(params)
    .update({ active: false, is_deleted: true })
    .returning("*");
};

module.exports = remove;
