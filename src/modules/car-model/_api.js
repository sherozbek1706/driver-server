const { addCarModel, listCarModel, removeCarModel } = require("./_controller");

const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");
const { isBlock } = require("../admin/middleware");

const router = require("express").Router();

const mAddCarModel = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mListCarModel = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mRemoveCarModel = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.post("/car-model", mAddCarModel, addCarModel);
router.get("/car-model", mListCarModel, listCarModel);
router.delete("/car-model/:id", mRemoveCarModel, removeCarModel);

module.exports = router;
