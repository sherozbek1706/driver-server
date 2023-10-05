const { addCar } = require("./_controller");

const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");
const { isBlock } = require("../admin/middleware");

const router = require("express").Router();

const mAddCar = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.post("/car", mAddCar, addCar);

module.exports = router;
