const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

const remove = async ({ params }) => {

  return db("car_model").where({ id: params.id }).del().returning("*");
};
module.exports = remove;
