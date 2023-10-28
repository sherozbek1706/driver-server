const db = require("../../../db");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../../../shared/errors");

const list = async ({ user }) => {
  const orderdriver = await db("driver-order")
    .where({ "driver-order.driver_id": user.id, "order.status": "progress" })
    .first()
    .leftJoin("driver", "driver-order.driver_id", "driver.id")
    .leftJoin("order", "driver-order.order_id", "order.id")
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
      "order.admin_id as order_admin_id"
    );

  let address;
  if (orderdriver?.order_address_id) {
    address = await db("address")
      .where({ id: orderdriver?.order_address_id })
      .first();
  }

  if (!orderdriver) {
    throw new BadRequestError("Bunday buyurtma mavjud emas!");
  }
  
  if (address) {
    orderdriver.order_address = address.address;
  }
  let admin;
  if (orderdriver?.order_admin_id) {
    admin = await db("admin")
      .where({ id: orderdriver?.order_admin_id })
      .first();
  }
  if (admin) {
    orderdriver.order_admin_first_name = admin.first_name;
    orderdriver.order_admin_last_name = admin.last_name;
  }

  return orderdriver;
};

module.exports = list;
