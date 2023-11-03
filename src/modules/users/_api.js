const { checkCodeUser, registerUser, loginUser } = require("./_controller");
const { user_img_upload } = require("../../shared/upload");

const router = require("express").Router();

const mRegisterUser = [user_img_upload];
const mLoginUser = [user_img_upload];

router.post("/users/check-code", checkCodeUser);
router.post("/users/register", mRegisterUser, registerUser);
router.post("/users/login", mLoginUser, loginUser);

module.exports = router;
