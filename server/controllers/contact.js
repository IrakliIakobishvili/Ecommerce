const Contact = require("../models/contact");
const { isEmpty } = require("../helpers/routeHelpers");

module.exports = {
  create: (req, res, next) => {
    if (isEmpty(req.body)) {
      res.json(isEmpty(req.body));
    } else {
      Contact.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        message: req.body.message
      })
        .then(() => res.status(201).json("Contact Saved"))
        .catch(() => res.status(422).json("Contact Saveing Failed!"));
    }
  },
  findAll: (req, res, next) => {
    Contact.find({})
      .sort({ createdAt: -1 })
      .then(contacts => res.json(contacts))
      .catch(() => res.status(422).json({ message: "Empty List" }));
  }
};