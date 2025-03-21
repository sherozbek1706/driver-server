const {
  checkCodeUser,
  registerUser,
  loginUser,
  showUser,
  checkMeUser,
  myorderUser,
  historyUser,
  cancelOrderUser,
} = require("./_controller");
const { user_img_upload } = require("../../shared/upload");
const { isLoggedIn, hasRole } = require("../../shared/auth");
const router = require("express").Router();

const mRegisterUser = [user_img_upload];
const mLoginUser = [user_img_upload];
const mShowUser = [user_img_upload, isLoggedIn, hasRole(["user"])];
const mCheckMeUser = [user_img_upload, isLoggedIn, hasRole(["user"])];
const mMyorderUser = [user_img_upload, isLoggedIn, hasRole(["user"])];
const mHistoryUser = [user_img_upload, isLoggedIn, hasRole(["user"])];
const mCancelOrderUser = [user_img_upload, isLoggedIn, hasRole(["user"])];

router.post("/users/check-code", checkCodeUser);
router.post("/users/register", mRegisterUser, registerUser);
router.post("/users/login", mLoginUser, loginUser);
router.get("/users/history", mHistoryUser, historyUser);
router.get("/users/show/me", mShowUser, showUser);
router.get("/users/check-me", mCheckMeUser, checkMeUser);
router.get("/users/my-order/:id", mMyorderUser, myorderUser);
router.get("/users/cancel/order", mCancelOrderUser, cancelOrderUser);

module.exports = router;
