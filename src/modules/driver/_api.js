const { addDriver, listDriver } = require("./_controller");

const { hasRole, isLoggedIn } = require("../../shared/auth");
const { driver_img_upload } = require("../../shared/upload");
const { isBlock } = require("../admin/middleware");

const router = require("express").Router();

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

router.post("/driver/add", mAddDriver, addDriver);
router.get("/driver", mListDriver, listDriver);

module.exports = router;
