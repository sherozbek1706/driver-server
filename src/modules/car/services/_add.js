const db = require("../../../db");
const { NotFoundError, BadRequestError } = require("../../../shared/errors");

const add = async ({ body }) => {
  const { model_id, region_id, number } = body;
  let existing;

  existing = await db("car_model").where({ id: model_id }).first();

  if (!existing) {
    throw new NotFoundError("Model topilmadi!");
  }

};

module.exports = add;
