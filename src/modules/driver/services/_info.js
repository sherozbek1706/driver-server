const db = require("../../../db");

const info = async ({ user }) => {
  const driver = await db("driver").where({ id: user.id }).first();

  if (!driver) {
    throw new NotFoundError("Driver Not Found!");
  }

  let order_drivers = await db("driver-order")
    .where({
      "driver-order.driver_id": driver.id,
    })
    .leftJoin("driver", "driver.id", "driver-order.driver_id")
    .leftJoin("order", "order.id", "driver-order.order_id")
    .leftJoin("address", "address.id", "order.address_id")
    .select(
      "driver-order.id",
      "driver-order.driver_id",
      "driver-order.paid",
      "driver-order.order_id",
      "driver-order.time",
      "order.district",
      "address.address",
      "driver.first_name",
      "driver.last_name"
    );

  const data_not_paid = [];
  const data_paid = [];
  const last_week_order = [];
  const today_order = [];

  let day = new Date();
  let today = `${day.getFullYear()}-${
    day.getMonth() + 1
  }-${day.getDate()} 00:00:00`;

  let ld7 = day.getTime() - 7 * 24 * 60 * 60 * 1000;

  order_drivers = order_drivers.sort((a, b) => a.id - b.id);
  order_drivers.forEach((item) => {
    if (item.paid) {
      data_paid.push(item);
    } else {
      data_not_paid.push(item);
    }

    if (ld7 < new Date(item.time).getTime()) {
      last_week_order.push(item);
    }
    if (new Date(today).getTime() < new Date(item.time).getTime()) {
      today_order.push(item);
    }
  });

  const data = {
    tdy: { data: today_order, length: today_order.length },
    ld7: { data: last_week_order, length: last_week_order.length },
    paid: { data: data_paid, length: data_paid.length },
    not_paid: { data: data_not_paid, length: data_not_paid.length },
    all: { data: order_drivers, length: order_drivers.length },
  };
  return data;
};

module.exports = info;
