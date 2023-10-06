const { addDriver } = require("./_controller");

const { hasRole, isLoggedIn } = require("../../shared/auth");
const { driver_img_upload } = require("../../shared/upload");
const { isBlock } = require("../admin/middleware");

const router = require("express").Router();

const mAddDriver = [
  driver_img_upload,
  isLoggedIn,
  hasRole(["admin", "super_admin"]),
];

router.post("/driver/add", mAddDriver, addDriver);

module.exports = router;
