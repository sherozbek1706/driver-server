const { loginAdmin, addAdmin, listAdmin } = require("./_controller");
const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");

const router = require("express").Router();

const mAddAdmin = [admin_img_upload, isLoggedIn, hasRole(["super_admin"])];
const mListAdmin = [admin_img_upload, isLoggedIn, hasRole(["super_admin"])];

router.post("/admin/login", loginAdmin);
router.post("/admin", mAddAdmin, addAdmin);
router.get("/admin", mListAdmin, listAdmin);

module.exports = router;
