const db = require("../../../db");

const list = async () => {
  return db("admin").where({ is_deleted: false });
};

module.exports = list;
