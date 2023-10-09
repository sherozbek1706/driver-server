const db = require("../../../db");

const closed = async () => {
  return db("order")
    .where({ status: "close" })
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
};
module.exports = closed;
