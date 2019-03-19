const Products = require("../models/product");

module.exports = {
  create: (req, res, next) => {
    Products.create(req.value.body)
      .then(product => res.json(product))
      .catch(() => res.status(422).json({ message: "Can't create" }));
  },

  findAll: (req, res, next) => {
    Products.find(req.query)
      .sort({ date: -1 })
      .then(all => res.json(all))
      .catch(() => res.status(422).json({ message: "Empty List" }));
  },
  findById: function(req, res, next) {
    Products.findById(req.params.id)
      .then(product => res.json(product))
      .catch(() => res.status(422).json({ message: "Can't Find Product" }));
  },
  findByCat: function(req, res, next) {
    Products.find({ category: req.params.id })
      .then(product => res.json(product))
      .catch(() => res.status(422).json({ message: "Can't Find Product" }));
  },
  update: (req, res, next) => {
    Products.findOneAndUpdate({ _id: req.params.id }, req.body) //req.value.body
      .then(product => res.json(product))
      .catch(() => res.status(422).json({ message: "Can't Update Product" }));
  },

  remove: (req, res, next) => {
    Products.findById({ _id: req.params.id })
      .then(product => product.remove())
      .then(product => res.json(product))
      .catch(err => res.status(422).json(err));
  },
  findByTitle: (req, res, next) => {
    Products.find(
      { name: { $regex: req.params.title, $options: "i" } },
      function(err, docs) {
        res.status(200).json(docs);
      }
    );
  }
};
