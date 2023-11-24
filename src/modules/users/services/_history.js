const db = require("../../../db");
const history = async ({ user }) => {
  const orders = await db("order")
    .where({ user_id: user.id })
    .leftJoin("address", "order.address_id", "address.id")
    // .leftJoin("users", "order.user_id", "users.id");
    .select("order.id")
    .select("order.address_id")
    .select("order.created_at")
    .select("order.status")
    // .select("order.user_id")
    .select("address.address")
    .select("order.district");
  //   .select("users.first_name")
  //   .select("users.last_name")
  //   .select("users.image")
  //   .select("users.username");
  return orders.sort((a, b) => b.id - a.id);
};

module.exports = history;
