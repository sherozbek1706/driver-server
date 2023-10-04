const {
  loginAdmin,
  addAdmin,
  listAdmin,
  showAdmin,
  removeAdmin,
  unremoveAdmin,
  editAdmin,
} = require("./_controller");
const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");
const { isBlock } = require("./middleware");

const router = require("express").Router();

const mLoginAdmin = [admin_img_upload];
const mAddAdmin = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["super_admin"]),
];
const mListAdmin = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["super_admin"]),
];
const mShowAdmin = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["super_admin", "admin"]),
];
const mRemoveAdmin = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["super_admin"]),
];
const mUnremoveAdmin = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["super_admin"]),
];
const mEditAdmin = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["super_admin", "admin"]),
];

router.post("/admin/login", mLoginAdmin, loginAdmin);
router.post("/admin", mAddAdmin, addAdmin);
router.get("/admin", mListAdmin, listAdmin);
router.get("/admin/:id", mShowAdmin, showAdmin);
router.delete("/admin/:id", mRemoveAdmin, removeAdmin);
router.delete("/admin/un/:id", mUnremoveAdmin, unremoveAdmin);
router.put("/admin/:id", mEditAdmin, editAdmin);

module.exports = router;
