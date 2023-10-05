const { addCarRegion, listCarRegion } = require("./_controller");

const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");
const { isBlock } = require("../admin/middleware");

const router = require("express").Router();

const mAddCarRegion = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mListCarRegion = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.post("/car-region", mAddCarRegion, addCarRegion);
router.get("/car-region", mListCarRegion, listCarRegion);

module.exports = router;
