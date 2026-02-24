const orderModel = require("../Models/orderModel");
const userModel = require("../Models/usermodel");

// Controller to handle orders
module.exports = {
  // Place a new order
  placeOrder: async (req, res) => {
    try {
      const { userId, items, amount, address, paymentMethod } = req.body;

      // Check if paymentMethod is valid
      const validMethods = ["Easypaisa", "JazzCash", "Bank", "COD"];
      if (!validMethods.includes(paymentMethod)) {
        return res.send({
          success: false,
          message: "Invalid payment method",
        });
      }

      // Create new order (NO STATUS FIELD)
      const newOrder = new orderModel({
        userId,
        items,
        amount,
        address,
        paymentMethod, // only save payment method
      });

      await newOrder.save(); // Save order to DB

      // Clear user's cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      // Static payment instructions
      if (paymentMethod === "Easypaisa") {
        return res.send({
          success: true,
          message:
            "Order placed successfully. Pay via Easypaisa using number: 03XXXXXXXXX",
          orderId: newOrder._id,
        });
      }

      if (paymentMethod === "JazzCash") {
        return res.send({
          success: true,
          message:
            "Order placed successfully. Pay via JazzCash using number: 03XXXXXXXXX",
          orderId: newOrder._id,
        });
      }

      if (paymentMethod === "Bank") {
        return res.send({
          success: true,
          message:
            "Order placed successfully. Transfer to Bank Account: XXXX-XXXX-XXXX",
          orderId: newOrder._id,
        });
      }

      // If COD
      return res.send({
        success: true,
        message:
          "Order placed successfully. Payment will be collected on delivery.",
        orderId: newOrder._id,
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Error placing order",
      });
    }
  },
};