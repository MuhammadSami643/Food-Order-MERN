const router = require("express").Router();
const authMiddleWare = require("../MiddleWare/auth");
const { placeOrder } = require("../Controllers/orderController");

router.post("/place", authMiddleWare, placeOrder);

module.exports = router;
