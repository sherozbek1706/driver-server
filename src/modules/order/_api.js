const { hasRole, isLoggedIn } = require("../../shared/auth");
const { driver_img_upload } = require("../../shared/upload");
const { isActive } = require("../driver/middleware");
const { isBlock } = require("../admin/middleware");
const { addOrder, listOrder } = require("./_controller");

const router = require("express").Router();

const mAddOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mListOrder = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  isActive,
  hasRole(["admin", "super_admin", "driver"]),
];

router.post("/order", mAddOrder, addOrder);
router.get("/order", mListOrder, listOrder);

module.exports = router;
