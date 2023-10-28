const db = require("../../../db");
const {
  ForbiddenError,
  PaymentRequiredError,
} = require("../../../shared/errors");

const opened = async ({ user }) => {
  const driver_order = await db("driver-order").where({ driver_id: user.id });
  const orders = await db("order");
  const driver = await db("driver").where({ id: user.id }).first();

  driver_order.map((order) => {
    const found = orders.find((o) => {
      return o.id == order.order_id && o.status == "progress";
    });
    if (found) {
      throw new ForbiddenError("Hozirda sizda tugallanmagan zakaz mavjud.");
    }
  });

  if (user.role == "driver") {
    if (driver.balans < 5000) {
      throw new PaymentRequiredError("Mablag' yetarli emas!");
    }
  }

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
