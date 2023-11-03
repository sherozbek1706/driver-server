const Codes = require("../schema/Codes");
const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

module.exports = async ({ body }) => {
  const exist = await Codes.findOne({ code: body?.code });
  if (!exist) {
    throw new NotFoundError("Kod topilmadi!");
  }

  let existed = await db("users").where({ phone_number: exist.number }).first();

  let now = Date.now();
  let thatnow = new Date(exist.date).getTime();

  if (now - thatnow > exist.expaired) {
    throw new ForbiddenError("Kod eskirgan!");
  }

  if (existed) {
    return { ...exist._doc, already_exist: true };
  }

  return { ...exist._doc, already_exist: false };
};
