const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  orders: []
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
