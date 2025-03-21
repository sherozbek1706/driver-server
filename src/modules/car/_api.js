const {
  addCar,
  listCar,
  editCar,
  removeCar,
  listAddDriver,
} = require("./_controller");

const { hasRole, isLoggedIn } = require("../../shared/auth");
const { admin_img_upload } = require("../../shared/upload");
const { isBlock } = require("../admin/middleware");

const router = require("express").Router();

const mAddCar = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mListCar = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mListAdddriver = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mEditCar = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];
const mRemoveCar = [
  admin_img_upload,
  isLoggedIn,
  isBlock,
  hasRole(["admin", "super_admin"]),
];

router.post("/car", mAddCar, addCar);
router.get("/car", mListCar, listCar);
router.get("/car/add-driver", mListAdddriver, listAddDriver);
router.put("/car/:id", mEditCar, editCar);
router.delete("/car/:id", mRemoveCar, removeCar);

module.exports = router;
