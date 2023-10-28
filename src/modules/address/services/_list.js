const db = require("../../../db");

const list = async () => {
  const address = await db("address");
  const order = await db("order");
  let order_address = [];
  address.map((adrs) => {
    let order_count = 0;
    order.map((o) => {
      if (o.address_id == adrs.id) {
        order_count++;
      }
    });
    order_address.push({ ...adrs, order_count: order_count });
  });
  return order_address;
};
module.exports = list;
