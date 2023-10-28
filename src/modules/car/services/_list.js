const db = require("../../../db");

const list = async () => {
  return db("car")
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
};

module.exports = list;
