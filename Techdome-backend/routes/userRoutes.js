const express = require("express");
const router = express.Router();
const { register, login, getUserData } = require("../controller/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/get_user_data", getUserData);

module.exports = router;