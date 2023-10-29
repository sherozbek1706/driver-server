const db = require("../../../db");

const dailyPayment = async () => {
  const payments = await db("payment");

  let payment_days = [];
  let payment_data = [];

  payments.forEach((payment) => {
    let payment_time = new Date(payment.payment_date);

    let day = `${payment_time.getFullYear()}-${
      payment_time.getMonth() + 1
    }-${payment_time.getDate()}`;

    if (day != "1970-1-1") {
      let yes = payment_days.includes(day);
      if (!yes) {
        payment_days.push(day);
      }
    }
  });

  payment_days.sort().forEach((item_day) => {
    let one = {};
    let mData = [];
    let count = 0;
    let money = 0;
    payments.forEach((payment) => {
      let payment_time = new Date(payment.payment_date);
      let day = `${payment_time.getFullYear()}-${
        payment_time.getMonth() + 1
      }-${payment_time.getDate()}`;

      if (day == item_day) {
        mData.push(payment);
        money += payment.money;
        count++;
      }
    });

    one = { day: item_day, data: mData, length: mData.length, money };

    payment_data.push(one);
  });

  return payment_data;

};
module.exports = dailyPayment;
