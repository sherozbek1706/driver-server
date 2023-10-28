const db = require("../../../db");

const topDriver = async () => {
  const driver = await db("driver");
  const driver_order = await db("driver-order");

  let top = [];

  driver.forEach((item_d) => {
    let count = 0;
    let orders = [];
    driver_order.forEach((item_o) => {
      if (item_d.id == item_o.driver_id) {
        count++;
        orders.push(item_o);
      }
    });
    let order = { length: count, data: orders };
    top.push({ id: item_d.id, username: item_d.username, order });
  });

  return top;
};

module.exports = topDriver;
