const { hasRole, isLoggedIn } = require("../../shared/auth");
const { driver_img_upload } = require("../../shared/upload");
const { isActive } = require("../driver/middleware");
const { isBlock } = require("../admin/middleware");
const checkUser = require("../users/middleware/check-user");
const { addMessage, listMessage } = require("./_controller");
const router = require("express").Router();

const mAddMessage = [
  driver_img_upload,
  isLoggedIn,
  isActive,
  isBlock,
  hasRole(["driver"]),
];

const mListMessage = [
  driver_img_upload,
  isLoggedIn,
  isActive,
  isBlock,
  hasRole(["driver"]),
];

router.post("/driver-message", mAddMessage, addMessage);
router.get("/driver-message", mListMessage, listMessage);

module.exports = router;
