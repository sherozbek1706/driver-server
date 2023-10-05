const db = require("../../../db");

const list = async () => {
  return await db("car_region");
};
module.exports = list;
