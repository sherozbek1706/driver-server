const { checkCodeUser, registerUser, loginUser } = require("./_controller");
const { user_img_upload } = require("../../shared/upload");

const router = require("express").Router();

const mRegisterUser = [user_img_upload];

router.post("/users/check-code", checkCodeUser);
router.post("/users/register", mRegisterUser, registerUser);

module.exports = router;
