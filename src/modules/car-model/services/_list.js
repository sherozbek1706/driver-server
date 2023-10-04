const db = require("../../../db");

const list = async () => {
  return db("car_model");
};
module.exports = list;
