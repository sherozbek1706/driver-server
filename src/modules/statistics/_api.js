const { isLoggedIn, hasRole } = require("../../shared/auth");
const { driver_img_upload } = require("../../shared/upload");
const { isBlock } = require("../admin/middleware");
const { isActive } = require("../driver/middleware");
const {
  topDriverStatistic,
  dailyOrderStatistic,
  dailyPaidStatistic,
  newDriversStatistic,
  dailyWorkStatistic,
} = require("./_controller");

const router = require("express").Router();

const mTopDriver = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  isActive,
  hasRole(["admin", "super_admin", "driver"]),
];

const mDailyOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mDailyPaid = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mNewDrivers = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mDailyWork = [
  driver_img_upload,
  isLoggedIn,
  isActive,
  hasRole(["driver"]),
];

router.get("/statistic/top-driver", mTopDriver, topDriverStatistic);
router.get("/statistic/daily-order", mDailyOrder, dailyOrderStatistic);
router.get("/statistic/daily-paid", mDailyPaid, dailyPaidStatistic);
router.get("/statistic/daily-work", mDailyWork, dailyWorkStatistic);
router.get("/statistic/new-drivers", mNewDrivers, newDriversStatistic);

module.exports = router;
