const db = require("../../../db");
const { NotFoundError, BadRequestError } = require("../../../shared/errors");

const edit = async ({ params, body }) => {
  const exist = await db("car").where({ id: params.id });

  if (!exist) {
    throw new NotFoundError("Moshina topilmadi!");
  }

  const { model_id, region_id, number } = body;
  let existing;

  existing = await db("car_model").where({ id: model_id }).first();

  if (!existing) {
    throw new NotFoundError("Model topilmadi!");
  }

  existing = await db("car_region").where({ id: region_id }).first();

  if (!existing) {
    throw new NotFoundError("Viloyat topilmadi!");
  }

};
module.exports = edit;
