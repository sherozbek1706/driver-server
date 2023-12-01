const db = require("../../../db");
module.exports = async () => {
  return db("driver-msg")
    .leftJoin("driver", "driver-msg.driver_id", "driver.id")
    .select(
      "driver-msg.id",
      "driver-msg.message",
      "driver-msg.driver_id",
      "driver-msg.created_at",
      "driver-msg.type",
      "driver.first_name",
      "driver.last_name",
      "driver.image",
      "driver.username"
    );
};
