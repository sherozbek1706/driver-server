const db = require("../../../db");

const progress = async () => {
  return db("order")
    .where({ status: "progress" })
    .leftJoin("admin", "order.admin_id", "admin.id")
    .leftJoin("address", "order.address_id", "address.id")
    .select(
      "order.id as id",
      "order.phone_number",
      "order.created_at",
      "order.status",
      "order.district",
      "order.address_id",
      "address.address",
      "admin.id as admin_id",
      "admin.first_name as admin_name"
    );

  // const order = await db("order").where({ status: "progress" });
  // const driverorder = await db("driver-order");
};
module.exports = progress;
