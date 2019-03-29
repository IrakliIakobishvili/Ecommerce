const Products = require("../models/product");
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

module.exports = {
  // create: (req, res, next) => {
  //   Products.create(req.value.body)
  //     .then(product => res.json(product))
  //     .catch(() => res.status(422).json({ message: "Can't create" }));
  // },
  create: (req, res, next) => {
    res.json(req.body);
    // Products.create(req.value.body)
    //   .then(product => res.json(product))
    //   .catch(() => res.status(422).json({ message: "Can't create" }));
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
  },
  findByFilter: async (req, res, next) => {
    let key = req.body.key;
    let lt = req.body.lt;
    let gt = req.body.gt;
    let docs = [];
    // console.log(typeof lt);
    if (key == "price") {
      docs = await Products.find({ "details.price": { $gt: gt, $lt: lt } });
    } else if (key == "protein") {
      docs = await Products.find({
        "details.protein": { $gt: gt, $lt: lt }
      });
    } else if (key == "cholesterol") {
      docs = await Products.find({
        "details.cholesterol": { $gt: gt, $lt: lt }
      });
    } else {
      docs = ["Empty"];
    }
    res.json(docs);
  }
};
