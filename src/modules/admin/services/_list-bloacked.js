const db = require("../../../db");

const list_blocked = async () => {
  return db("admin").where({ is_deleted: true });
};

module.exports = list_blocked;
