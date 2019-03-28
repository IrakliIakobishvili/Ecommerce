const Category = require("../models/categories");
const User = require("../models/user");

module.exports = {
  create: async (req, res, next) => {
    const foundCategory = await Category.findOne({
      categoryID: req.value.body.categoryID
    });
    if (foundCategory) {
      return res.status(403).json({ error: "Category ID is already in use" });
    }

    // Create a new category
    const newCategory = new Category({
      ...req.value.body
    });

    await newCategory.save();
    res.status(201).json({ message: "Category ID Created Successfully" });
  },

  findAll: async (req, res, next) => {
    const allCategory = await Category.find({});
    if (!allCategory) {
      return res.status(403).json({ message: "Category is Empty" });
    } else {
      return res.status(200).json(allCategory);
    }
  },
  update: async (req, res, next) => {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(403).json({ message: "Wrong Category ID" });
    }
    // await Category.updateOne({ _id: decoded.sub }, { "local.verified": true });
    return res.status(200).json({ message: "OK" });
  },
  findByCatId: async (req, res, next) => {
    const category = await Category.findOne({ categoryID: req.params.id });
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }
    res.status(200).json({ category: category });
  },
  findByValue: (req, res, next) => {
    Category.find(
      { title: { $regex: req.params.value, $options: "i" } },
      function(err, docs) {
        res.status(200).json(docs);
      }
    );
  },
  remove: async (req, res, next) => {
    res.status(200).json({ delete: req.params.id });
  }
};
