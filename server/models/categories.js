const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const catSchema = new Schema(
  {
    categoryID: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Create a Category
const Category = mongoose.model("categorie", catSchema);

// Export the model
module.exports = Category;
