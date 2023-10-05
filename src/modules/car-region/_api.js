const {
  addCarRegion,
  listCarRegion,
  removeCarRegion,
  editCarRegion,
} = require("./_controller");

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
const mRemoveCarRegion = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mEditCarRegion = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.post("/car-region", mAddCarRegion, addCarRegion);
router.get("/car-region", mListCarRegion, listCarRegion);
router.delete("/car-region/:id", mRemoveCarRegion, removeCarRegion);
router.put("/car-region/:id", mEditCarRegion, editCarRegion);

module.exports = router;
