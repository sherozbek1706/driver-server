const db = require("../../../db");

const add_driver = async () => {
  const drivers = await db("driver");
  const cars = await db("car")
    .leftJoin("car_model", "car.model_id", "car_model.id")
    .leftJoin("car_region", "car.region_id", "car_region.id")
    .select(
      "car.id as id",
      "car.model_id",
      "car.region_id",
      "car.color",
      "car.year",
      "car.number",
      "car_region.region as car_region",
      "car_region.number as car_region_number",
      "car_model.model as car_model"
    );

  const data_cars = [];

  cars.forEach((car) => {
    let count = 0;
    drivers.forEach((driver) => {
      if (car.id == driver.car_id) {
        count++;
      }
    });
    if (count == 0) {
      data_cars.push(car);
    }
  });
  return data_cars;
};

module.exports = add_driver;
