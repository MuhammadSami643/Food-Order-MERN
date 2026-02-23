const mongoose = require("mongoose");

// Define schema for orders
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // user who placed order
  items: { type: Array, required: true }, // items in the cart
  amount: { type: Number, required: true }, // total amount
  address: { type: Object, required: true }, // delivery info
  paymentMethod: { 
    type: String, 
    enum: ["Easypaisa", "JazzCash", "Bank", "COD"], // supported payments
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Paid", "Failed", "COD"], 
    default: "Pending" 
  },
  date: { type: Date, default: Date.now() }, // order date
});

module.exports = orderSchema;