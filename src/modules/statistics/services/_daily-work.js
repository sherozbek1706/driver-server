const db = require("../../../db");

const dailyWork = async ({ params }) => {
  const orders = await db("driver-order").where({ driver_id: params.id });

  const data = [];

  const hours = [];

  for (let i = 0; i <= 23; i++) {
    let hour = i.toString();
    if (hour.length === 1) {
      hour = "0" + hour;
    }
    hour = hour + ":00";
    hours.push(hour);
  }

  hours.forEach((hour) => {
    let count = 0;
    let order = {};
    let items = [];
    orders.forEach((item) => {
      if (new Date(item.time).getDate() == new Date().getDate()) {
        if (new Date(item.time).getHours() == hour.slice(0, 2)) {
          items.push(item);
          count++;
        }
      }
      order.time = hour;
    });
    data.push({ time: hour, items, length: count });
  });

  return { hours, data };
};

module.exports = dailyWork;
