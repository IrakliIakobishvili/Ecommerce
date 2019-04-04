const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required"
    },
    category: {
      type: String
    },
    quantity: {
      type: Number,
      required: "Quantity is required"
    },
    details: {
      size: String,
      energy: String,
      sugar: String,
      protein: String,
      cholesterol: String,
      photo: String,
      price: Number,
      description: String
    }
  },
  { timestamps: true }
);

// Create a Product
const Product = mongoose.model("Product", productSchema);

// Export the model
module.exports = Product;
