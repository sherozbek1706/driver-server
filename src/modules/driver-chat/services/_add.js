const db = require("../../../db");
module.exports = async ({ body, user }) => {
  const { message } = body;
  const { id: driver_id } = user;

  const driver = await db("driver").where({ id: driver_id }).first();

  await db("driver")
    .where({ id: driver_id })
    .update({ balans: driver.balans - 50 });

  return db("driver-msg").insert({ message, driver_id }).returning("*");
};
