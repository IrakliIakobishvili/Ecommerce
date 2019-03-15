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
      dimensions: String,
      weight: String,
      displayType: String,
      displaySize: String,
      displayResolution: String,
      os: String,
      cpu: String,
      internalMemory: String,
      ram: String,
      camera: String,
      batery: String,
      color: String,
      price: Number,
      photo: String
    }
  },
  { timestamps: true }
);

// Create a Product
const Product = mongoose.model("product", productSchema);

// Export the model
module.exports = Product;
