const db = require("../../../db");
const { ForbiddenError, NotFoundError } = require("../../../shared/errors");

const show = async ({ params, user, role }) => {
  let existing = await db("driver").where({ id: params.id }).first();

  if (!existing) {
    throw new NotFoundError("Haydovchi topilmadi!");
  }

  existing = await db("driver")
    .where({ id: params.id, is_deleted: false })
    .first();

  if (!existing) {
    throw new ForbiddenError("Ushbu haydovchi hozirda blok holatida!");
  }

  if (existing.id != user.id) {
    if (role == "driver") {
      throw new ForbiddenError("Sizda bunday huquq yo'q!");
    }
  }

  const Driver = await db("driver")
    .where({ "driver.id": params.id, "driver.is_deleted": false })
    .leftJoin("admin", "driver.admin_id", "admin.id")
    .leftJoin("car", "driver.car_id", "car.id")
    .select(
      "driver.id as id",
      "driver.first_name",
      "driver.last_name",
      "driver.age",
      "driver.image",
      "driver.address",
      "driver.phone_number",
      "driver.active",
      "driver.balans",
      "driver.username",
      "driver.password",
      "driver.is_deleted",
      "driver.created_at",
      "admin.id as admin_id",
      "admin.first_name as admin_name",
      "car.id as car_id",
      "car.region_id as car_region_id",
      "car.model_id as car_model",
      "car.number as car_number",
      "car.year as car_year",
      "car.color as car_color"
    )
    .first();

  const car_model = await db("car_model")
    .where({ id: Driver.car_model })
    .select("model")
    .first();
  return { ...Driver, car_model: car_model?.model };
};

module.exports = show;
