const {
  addAddress,
  listAddress,
  removeAddress,
  editAddress,
} = require("./_controller");

const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");
const { isBlock } = require("../admin/middleware");

const router = require("express").Router();

const mAddAddress = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mListAddress = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mRemoveAddress = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mEditAddress = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
router.post("/address", mAddAddress, addAddress);
router.get("/address", mListAddress, listAddress);
router.delete("/address/:id", mRemoveAddress, removeAddress);
router.put("/address/:id", mEditAddress, editAddress);

module.exports = router;
