const JWT = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const { sendMail } = require("../nodemailer");
const User = require("../models/user");
const { JWT_SECRET } = require("../configuration");

signToken = user => {
  return JWT.sign(
    {
      iss: "Ecommerce",
      sub: user.id,
      iat: new Date().getTime(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // Expires in 60 minutes
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const foundUser = await User.findOne({
      "local.email": req.value.body.email
    });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      method: "local",
      local: { ...req.value.body }
    });

    await newUser.save();

    // Generate the token
    const token = signToken(newUser);

    sendMail(
      req.protocol + "://" + req.headers.host + req.baseUrl,
      req.value.body.email,
      req.value.body.firstName,
      token
    )
      .then(function(response) {
        console.info(response);
        res.status(200).json({ message: "Please Verify your Email" });
      })
      .catch(function(error) {
        console.info(error);
        res
          .status(400)
          .json({ error: "Email could not be sent, try to login" });
      });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  findAll: function(req, res) {
    User.find({})
      .sort({ date: -1 })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  secret: async (req, res, next) => {
    console.log("I managed to get here!");
    let loggedUser = await User.findOne({ _id: req.user.id });
    // console.log(req.user);
    loggedUser = loggedUser[loggedUser.method];

    console.log(loggedUser);
    res.json({ secter_page: "resource" });
  },

  verify: async (req, res, next) => {
    try {
      const decoded = jwtDecode(req.params.token);
      let unverified_user = await User.findOne({ _id: decoded.sub });
      if (!unverified_user) {
        return res.status(403).json({ message: "Wrong URL" });
      } else if (unverified_user.local.verified) {
        return res.status(200).json({ message: "Already Verified" });
      }
      await User.updateOne({ _id: decoded.sub }, { "local.verified": true });
      return res.json({ message: "Successfully Verified" }); // Or send Token
    } catch (err) {
      return res.status(400).json({ message: "Wrong URL (catch)" });
    }
  },
  recover: async (req, res, next) => {
    try {
      // const decoded = jwtDecode(req.params.token);
      // let unverified_user = await User.findOne({ _id: decoded.sub });
      // if (!unverified_user) {
      //   return res.status(403).json({ message: "Wrong URL" });
      // } else if (unverified_user.local.verified) {
      //   return res.status(200).json({ message: "Already Verified" });
      // }
      // await User.updateOne({ _id: decoded.sub }, { "local.verified": true });
      // return res.json({ message: "Successfully Verified" }); // Or send Token
    } catch (err) {
      // return res.status(400).json({ message: "Wrong URL (catch)" });
    }
  }
};
