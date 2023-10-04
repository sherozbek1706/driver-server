const db = require("../../../db");

const list_active = async () => {
  return db("admin").where({ active: true, is_deleted: false });
};

module.exports = list_active;
