const { checkCodeUser, registerUser, loginUser } = require("./_controller");
const { user_img_upload } = require("../../shared/upload");

const router = require("express").Router();


router.post("/users/check-code", checkCodeUser);

module.exports = router;
