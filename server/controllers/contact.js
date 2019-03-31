const Contact = require("../models/contact");
const { isEmpty } = require("../helpers/routeHelpers");

module.exports = {
  create: (req, res, next) => {
    if (isEmpty(req.body)) {
      res.json(isEmpty(req.body));
    } else {
      Contact.create({ ...req.body })
        .then(() => res.status(201).json("Message has been sent"))
        .catch(() => res.status(422).json("Message sending Failed!"));
    }
  },
  findAll: (req, res, next) => {
    Contact.find({})
      .sort({ createdAt: -1 })
      .then(contacts => res.json(contacts))
      .catch(() => res.status(422).json({ message: "Empty List" }));
  }
};
