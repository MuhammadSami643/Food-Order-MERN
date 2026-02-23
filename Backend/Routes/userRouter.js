const router = require("express").Router();
const { loginUser, registerUser } = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
