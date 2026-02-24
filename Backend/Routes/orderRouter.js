const router = require("express").Router();
const authMiddleWare = require("../MiddleWare/auth");
const { placeOrder, userOrders,getAllOrders } = require("../Controllers/orderController");

router.post("/place", authMiddleWare, placeOrder);

module.exports = router;
