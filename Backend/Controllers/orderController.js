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

      // Create new order
      const newOrder = new orderModel({
        userId,
        items,
        amount,
        address,
        paymentMethod,
        status: paymentMethod === "COD" ? "COD" : "Pending",
      });

      await newOrder.save(); // Save order to DB

      // Clear user's cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      // For online payment methods, send payment instructions
      if (paymentMethod === "Easypaisa") {
        // Example: send Easypaisa instructions
        return res.send({
          success: true,
          message: "Order placed. Pay via Easypaisa using number: 03XXXXXXXXX",
          orderId: newOrder._id,
        });
      } else if (paymentMethod === "JazzCash") {
        return res.send({
          success: true,
          message: "Order placed. Pay via JazzCash using number: 03XXXXXXXXX",
          orderId: newOrder._id,
        });
      } else if (paymentMethod === "Bank") {
        return res.send({
          success: true,
          message: "Order placed. Bank transfer instructions sent.",
          orderId: newOrder._id,
        });
      }

      // If COD
      return res.send({
        success: true,
        message: "Order placed. Payment will be collected on delivery (COD).",
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

  // Fetch all orders for a user
  getUserOrders: async (req, res) => {
    try {
      const { userId } = req.body;
      const orders = await orderModel.find({ userId }).sort({ date: -1 });

      res.send({
        success: true,
        orders,
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Error fetching orders",
      });
    }
  },

  // Update order status (for admin or payment confirmation)
  updateOrderStatus: async (req, res) => {
    try {
      const { orderId, status } = req.body;

      const validStatus = ["Pending", "Paid", "Failed", "COD"];
      if (!validStatus.includes(status)) {
        return res.send({
          success: false,
          message: "Invalid status",
        });
      }

      await orderModel.findByIdAndUpdate(orderId, { status });

      res.send({
        success: true,
        message: "Order status updated",
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Error updating order status",
      });
    }
  },

//user orders for frontend


};