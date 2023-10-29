const db = require("../../../db");

const list = async () => {
  const list = await db("payment")
    .leftJoin("admin", "payment.admin_id", "admin.id")
    .leftJoin("driver", "payment.driver_id", "driver.id")
    .select(
      "payment.id",
      "payment.payment_date",
      "payment.money",
      "payment.action",
      "payment.then_money",
      "payment.old_balans",
      "payment.new_balans",
      "payment.admin_id",
      "payment.driver_id",
      "driver.username as driver_username",
      "driver.first_name as driver_firstname",
      "driver.last_name as driver_lastname",
      "admin.username as admin_username",
      "admin.first_name as admin_firstname",
      "admin.last_name as admin_lastname"
    );

  return list;
};

module.exports = list;
