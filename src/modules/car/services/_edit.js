const db = require("../../../db");
const { NotFoundError, BadRequestError } = require("../../../shared/errors");

const edit = async ({ params, body }) => {
  const exist = await db("car").where({ id: params.id });

  if (!exist) {
    throw new NotFoundError("Moshina topilmadi!");
  }

};
module.exports = edit;
