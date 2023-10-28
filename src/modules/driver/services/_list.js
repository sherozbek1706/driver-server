const db = require("../../../db");

const list = async () => {
  return (await db("driver").where({ is_deleted: false })).sort(
    (a, b) => b.id - a.id
  );
};
module.exports = list;
