const db = require("../../../db");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../../../shared/errors");

const list = async ({ user }) => {
  const orderdriver = await db("driver-order")
    .where({ "driver-order.driver_id": user.id, "order.status": "progress" })
    .orWhere({ "driver-order.driver_id": user.id, "order.status": "wait" })
    .orWhere({ "driver-order.driver_id": user.id, "order.status": "restart" })
    .first()
    .leftJoin("driver", "driver-order.driver_id", "driver.id")
    .leftJoin("order", "driver-order.order_id", "order.id")
    .leftJoin("address", "order.address_id", "address.id")
    .leftJoin("admin", "order.admin_id", "admin.id")
    .select(
      "driver-order.id as id",
      "driver-order.driver_id",
      "driver-order.order_id",
      "driver-order.time",
      "driver.first_name as driver_first_name",
      "driver.last_name as driver_last_name",
      "driver.username as driver_username",
      "driver.phone_number as driver_phone_number",
      "order.phone_number as order_phone_number",
      "order.status as order_status",
      "order.district as order_district",
      "order.address_id as order_address_id",
      "order.admin_id as order_admin_id",
      "address.address as order_address",
      "admin.first_name as order_admin_first_name",
      "admin.last_name as order_admin_last_name"
    );

  return orderdriver;
};

module.exports = list;
