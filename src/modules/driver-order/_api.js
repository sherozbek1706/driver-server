const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");
const { isActive } = require("../driver/middleware");
const { isBlock } = require("../admin/middleware");
const {
  getDriverOrder,
  listDriverOrder,
  handoverDriverOrder,
  allDriverOrder,
  paidDriverOrder,
  DriverOrder,
  handwaitDriverOrder,
  handrestartDriverOrder,
} = require("./_controller");

const router = require("express").Router();

const mGetDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isActive,
  hasRole(["driver"]),
];
const mListDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isActive,
  isBlock,
  hasRole(["super_admin", "admin", "driver"]),
];
const mHandOverDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isActive,
  hasRole(["driver"]),
];
const mHandWaitDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isActive,
  hasRole(["driver"]),
];
const mHandRestartDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isActive,
  hasRole(["driver"]),
];
const mAllDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mPaidDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.get("/driver-order/all", mAllDriverOrder, allDriverOrder);
router.get("/driver-order/driver/:id", mDriverOrder, DriverOrder);
router.post("/driver-order/:id", mGetDriverOrder, getDriverOrder);
router.get("/driver-order", mListDriverOrder, listDriverOrder);
router.post(
  "/driver-order/handover/:id",
  mHandOverDriverOrder,
  handoverDriverOrder
);
router.post(
  "/driver-order/handwait/:id",
  mHandWaitDriverOrder,
  handwaitDriverOrder
);
router.post(
  "/driver-order/handrestart/:id",
  mHandRestartDriverOrder,
  handrestartDriverOrder
);
router.patch("/driver-order/paid/:id", mPaidDriverOrder, paidDriverOrder);

module.exports = router;
