const db = require("../../../db");
const { NotFoundError, ForbiddenError } = require("../../../shared/errors");

const get = async ({ params, user }) => {
  const existing = await db("order")
    .where({ id: params.id, status: "open" })
    .first();

  if (!existing) {
    throw new NotFoundError("Zakaz topilmadi");
  }

  const driver_order = await db("driver-order").where({ driver_id: user.id });
  const orders = await db("order");

  driver_order.map((order) => {
    const found = orders.find((o) => {
      return o.id == order.order_id && o.status == "progress";
    });
    if (found) {
      throw new ForbiddenError("Hozirda sizda tugallanmagan zakaz mavjud.");
    }
  });

  await db("order").where({ id: params.id }).update({ status: "progress" });

  const driverorder = {
    driver_id: user.id,
    order_id: existing.id,
    time: new Date().toLocaleDateString(),
    // time: Date(Date.now()).toString(),
  };

  return db("driver-order").insert(driverorder).returning("*");
};

module.exports = get;
