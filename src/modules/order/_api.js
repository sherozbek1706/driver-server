const { hasRole, isLoggedIn } = require("../../shared/auth");
const { driver_img_upload } = require("../../shared/upload");
const { isActive } = require("../driver/middleware");
const { isBlock } = require("../admin/middleware");
const checkUser = require("../users/middleware/check-user")
const {
  addOrder,
  listOrder,
  openedOrder,
  closedOrder,
  progressOrder,
  removeOrder,
} = require("./_controller");

const router = require("express").Router();

const mAddOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  checkUser,
  hasRole(["admin", "super_admin", "user"]),
];
const mListOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mOpenedOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  isActive,
  hasRole(["admin", "super_admin", "driver"]),
];
const mClosedOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mProgressOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mRemoveOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.post("/order", mAddOrder, addOrder);
router.get("/order", mListOrder, listOrder);
router.get("/order/open", mOpenedOrder, openedOrder);
router.get("/order/close", mClosedOrder, closedOrder);
router.get("/order/progress", mProgressOrder, progressOrder);
router.delete("/order/:id", mRemoveOrder, removeOrder);

module.exports = router;
