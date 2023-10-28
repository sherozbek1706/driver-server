const db = require("../../../db");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../../../shared/errors");

const all = async () => {
  const orderdriver = await db("driver-order")
    .leftJoin("driver", "driver-order.driver_id", "driver.id")
    .leftJoin("order", "driver-order.order_id", "order.id")
    .leftJoin("address", "order.address_id", "address.id")
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
      "driver-order.paid"
    );

  return orderdriver.sort((a, b) => b.id - a.id);
};

module.exports = all;
