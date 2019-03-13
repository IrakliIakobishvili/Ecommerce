const JWT = require("jsonwebtoken");
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
    // Respond with token
    res.status(200).json({ token });
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
    loggedUser = loggedUser[loggedUser.method];

    console.log(loggedUser);
    res.json({ secret: "resource" });
  }
};
