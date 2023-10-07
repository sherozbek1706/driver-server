const db = require("../../../db");

const list = async () => {
  return db("address");
};
module.exports = list;
