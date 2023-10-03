const { loginAdmin } = require("./_controller");

const router = require("express").Router();

router.post("/admin/login", loginAdmin);

module.exports = router;
