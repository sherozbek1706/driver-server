const db = require("../../../db");
const { BadRequestError, NotFoundError } = require("../../../shared/errors");

const edit = async ({ params, body }) => {
  const existing = await db("car_region").where({ id: params.id });

  if (!existing) {
    throw new NotFoundError("Car Region topilmadi!");
  }


module.exports = edit;
