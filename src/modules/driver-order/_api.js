const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");
const { isActive } = require("../driver/middleware");
const {
  getDriverOrder,
  listDriverOrder,
  handoverDriverOrder,
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
  hasRole(["super_admin", "admin", "driver"]),
];
const mHandOverDriverOrder = [
  admin_img_upload,
  isLoggedIn,
  isActive,
  hasRole(["driver"]),
];

router.post("/driver-order/:id", mGetDriverOrder, getDriverOrder);
router.get("/driver-order", mListDriverOrder, listDriverOrder);
router.post(
  "/driver-order/handover/:id",
  mHandOverDriverOrder,
  handoverDriverOrder
);

module.exports = router;
