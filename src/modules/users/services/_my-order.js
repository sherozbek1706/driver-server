const db = require("../../../db");
const { NotFoundError } = require("../../../shared/errors");

module.exports = async ({ user, params }) => {
  const exist = await db("driver-order").where({ order_id: params.id }).first();

  if (!exist) {
    throw new NotFoundError("Buyurtma topilmadi");
  }

  const order = await db("driver-order")
    .where({ order_id: params.id })
    .leftJoin("driver", "driver-order.driver_id", "driver.id")
    .leftJoin("order", "driver-order.order_id", "order.id")
    .leftJoin("address", "order.address_id", "address.id")
    .leftJoin("car", "driver.car_id", "car.id")
    .leftJoin("car_model", "car.model_id", "car_model.id")
    .leftJoin("car_region", "car.region_id", "car_region.id")
    .select(
      "driver-order.id",
      "driver-order.order_id",
      "driver-order.driver_id",
      "address.address",
      "order.district",
      "driver.first_name",
      "driver.last_name",
      "driver.image",
      "driver.age",
      "driver.phone_number",
      "driver.car_id",
      "car.color",
      "car_model.model",
      "car_region.region",
      "car_region.number as region_number",
      "car.number",
      "driver-order.delay_time"
    )
    .first();

  return order;
};
