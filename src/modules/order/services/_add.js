const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const add = async ({ body, user }) => {
  const { address_id } = body;


  return db("order")
    .insert({ ...body, admin_id: user.id })
    .returning("*");
};

module.exports = add;
