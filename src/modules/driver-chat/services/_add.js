const db = require("../../../db");
module.exports = async ({ body, user }) => {
  const { message } = body;
  const { id: driver_id } = user;

  return db("driver-msg").insert({ message, driver_id }).returning("*");
};
