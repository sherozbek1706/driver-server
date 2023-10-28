const db = require("../../../db");

const dailyPaid = async () => {
  const driver_orders = await db("driver-order")
    .leftJoin("order", "driver-order.order_id", "order.id")
    .leftJoin("driver", "driver-order.driver_id", "driver.id")
    .leftJoin("address", "order.address_id", "address.id")
    .select(
      "driver-order.id",
      "driver-order.order_id",
      "driver-order.driver_id",
      "driver-order.time",
      "driver-order.paid_time",
      "driver-order.paid",
      "driver.username",
      "driver.first_name",
      "driver.phone_number",
      "address.address",
      "order.district"
    );

  let info = [];
  let info_days = [];
  let paid_days = [];
  let created_days = [];
  let data = {};
  let paid_data = [];
  let created_data = [];

  //**** */
  // to'lov bo'lgan vaqtlarni saralab olish uchun qilindi.
  //**** */

  driver_orders.forEach((orders) => {
    let paid_time = new Date(orders.paid_time);
    let day = `${paid_time.getFullYear()}-${
      paid_time.getMonth() + 1
    }-${paid_time.getDate()}`;

    if (day != "1970-1-1") {
      let yes = paid_days.includes(day);
      if (!yes) {
        paid_days.push(day);
      }
    }
  });

  //**** */
  // paid bo'lganlarni malumotini olish va uzunligini chiqarish
  //**** */

  paid_days.sort().forEach((item_day) => {
    let one = {};
    let mData = [];
    let count = 0;
    driver_orders.forEach((orders) => {
      let paid_time = new Date(orders.paid_time);
      let day = `${paid_time.getFullYear()}-${
        paid_time.getMonth() + 1
      }-${paid_time.getDate()}`;

      if (day == item_day) {
        mData.push(orders);
        count++;
      }
    });

    one = { day: item_day, data: mData, length: mData.length };

    paid_data.push(one);
  });

  //**** */
  // Chart uchun statistika sababdan dayslarni olish,
  //**** */

  driver_orders.forEach((orders) => {
    let paid_time = new Date(orders.paid_time);
    let day = `${paid_time.getFullYear()}-${
      paid_time.getMonth() + 1
    }-${paid_time.getDate()}`;

    if (day != "1970-1-1") {
      let yes = info_days.includes(day);
      if (!yes) {
        info_days.push(day);
      }
    }

    let created_time = new Date(orders.time);
    let c_day = `${created_time.getFullYear()}-${
      created_time.getMonth() + 1
    }-${created_time.getDate()}`;

    if (c_day != "1970-1-1") {
      let yes = info_days.includes(c_day);
      if (!yes) {
        info_days.push(c_day);
      }
    }
  });

  //**** */
  // Chart uchun datalar
  //**** */

  info_days.sort().forEach((item_day) => {
    let one = {};
    let countp = 0;
    let countc = 0;
    let count_not_pay = 0;
    driver_orders.forEach((orders) => {
      let paid_time = new Date(orders.paid_time);
      let created_time = new Date(orders.time);

      let day = `${paid_time.getFullYear()}-${
        paid_time.getMonth() + 1
      }-${paid_time.getDate()}`;

      let c_day = `${created_time.getFullYear()}-${
        created_time.getMonth() + 1
      }-${created_time.getDate()}`;

      if (item_day == day) {
        countp++;
      }

      if (item_day == c_day) {
        countc++;
        if (orders.paid) {
          count_not_pay++;
        }
      }
    });

    one = {
      day: item_day, // bugungi kunning sanasi
      not_paid_that_day: count_not_pay, // bugungi kunnning to'lov qilingan buyurtmalari
      count_paid: countp, // bugungi to'lovlar soni
      count_created: countc, // bugungi buyurtmalar soni
    };

    info.push(one);
  });

  //**** */
  // created bo'lgan malumotlar days olish
  //**** */

  driver_orders.forEach((orders) => {
    let created_time = new Date(orders.time);
    let day = `${created_time.getFullYear()}-${
      created_time.getMonth() + 1
    }-${created_time.getDate()}`;

    let yes = created_days.includes(day);
    if (!yes) {
      created_days.push(day);
    }
  });

  //**** */
  // created bo'lganlarni datalari
  //**** */

  created_days.sort().forEach((item_day) => {
    let one = {};
    let mData = [];
    let count = 0;
    driver_orders.forEach((orders) => {
      let created_time = new Date(orders.time);
      let day = `${created_time.getFullYear()}-${
        created_time.getMonth() + 1
      }-${created_time.getDate()}`;

      if (day == item_day) {
        mData.push(orders);
        count++;
      }
    });

    one = { day: item_day, data: mData, length: mData.length };

    created_data.push(one);
  });

  data = { info, created_data, paid_data };

  return data;
};

module.exports = dailyPaid;
