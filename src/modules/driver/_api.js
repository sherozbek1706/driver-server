const {
  addDriver,
  listDriver,
  showDriver,
  loginDriver,
  removeDriver,
} = require("./_controller");

const { hasRole, isLoggedIn } = require("../../shared/auth");
const { driver_img_upload } = require("../../shared/upload");
const { isActive } = require("./middleware");
const { isBlock } = require("../admin/middleware");

const router = require("express").Router();

const mLoginDriver = [driver_img_upload];
const mAddDriver = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mListDriver = [
  driver_img_upload,
  isLoggedIn,
  hasRole(["admin", "super_admin"]),
  isBlock,
];
const mShowDriver = [
  driver_img_upload,
  isLoggedIn,
  isActive,
  hasRole(["admin", "super_admin", "driver"]),
];
const mRemoveDriver = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.post("/driver/login", mLoginDriver, loginDriver);
router.post("/driver/add", mAddDriver, addDriver);
router.get("/driver", mListDriver, listDriver);
router.get("/driver/:id", mShowDriver, showDriver);
router.delete("/driver/:id", mRemoveDriver, removeDriver);

module.exports = router;
