const db = require("../../../db");

const opened = async () => {
  return db("order")
    .where({ status: "open" })
    .leftJoin("admin", "order.admin_id", "admin.id")
    .leftJoin("address", "order.address_id", "address.id")
    .select(
      "order.id as id",
      "order.phone_number",
      "order.created_at",
      "order.status",
      "order.address_id",
      "order.district",
      "address.address",
      "admin.id as admin_id",
      "admin.first_name as admin_name"
    );
};
module.exports = opened;
