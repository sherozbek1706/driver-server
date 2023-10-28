const db = require("../../../db");

const newDrivers = async () => {
  const drivers = await db("driver");

  let days = [];
  let data = [];

  drivers.forEach((driver) => {
    let created_at = new Date(driver.created_at);
    let day = `${created_at.getFullYear()}-${
      created_at.getMonth() + 1
    }-${created_at.getDate()}`;

    let yes = days.includes(day);
    if (!yes) {
      days.push(day);
    }
  });

  days.sort().forEach((item_day) => {
    let one = {};
    let mData = [];
    let count = 0;
    drivers.forEach((driver) => {
      let created_at = new Date(driver.created_at);
      let day = `${created_at.getFullYear()}-${
        created_at.getMonth() + 1
      }-${created_at.getDate()}`;

      if (day == item_day) {
        mData.push(driver);
        count++;
      }
    });

    one = { day: item_day, data: mData, length: mData.length };

    data.push(one);
  });

  return data;
};

module.exports = newDrivers;
