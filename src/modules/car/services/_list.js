const db = require("../../../db");

const list = async () => {
  return db("car");
};

module.exports = list;
