const JWT = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const { sendMail } = require("../nodemailer");
const User = require("../models/user");

module.exports = {
  profile: async (req, res, next) => {
    console.log("I managed to get here! I am Admin");
    let loggedUser = await User.findOne({ _id: req.user.id });
    loggedUser = loggedUser[loggedUser.method];
    res.json({
      adminPanel: `Response From Server API | Email: ${loggedUser.email}`
    });
  }
};
