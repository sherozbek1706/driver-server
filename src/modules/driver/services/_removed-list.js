const db = require("../../../db");

const list = async () => {
  return db("driver").where({ is_deleted: true });
};
module.exports = list;
