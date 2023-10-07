const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const edit = async ({ params, body }) => {
  return db("address").where({ id: params.id }).update(body).returning("*");
};

module.exports = edit;
