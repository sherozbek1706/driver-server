const { hasRole, isLoggedIn } = require("../../shared/auth");
const { driver_img_upload } = require("../../shared/upload");
const { isActive } = require("../driver/middleware");
const { isBlock } = require("../admin/middleware");
const { listPayments } = require("./_controller");

const router = require("express").Router();

const mListPayments = [
  driver_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.get("/payments", mListPayments, listPayments);

module.exports = router;
