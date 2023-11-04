const {
  checkCodeUser,
  registerUser,
  loginUser,
  showUser,
} = require("./_controller");
const { user_img_upload } = require("../../shared/upload");
const { isLoggedIn, hasRole } = require("../../shared/auth");
const router = require("express").Router();

const mRegisterUser = [user_img_upload];
const mLoginUser = [user_img_upload];
const mShowUser = [user_img_upload, isLoggedIn, hasRole(["client"])];

router.post("/users/check-code", checkCodeUser);
router.post("/users/register", mRegisterUser, registerUser);
router.post("/users/login", mLoginUser, loginUser);
router.get("/users/show/me", mShowUser, showUser);

module.exports = router;
