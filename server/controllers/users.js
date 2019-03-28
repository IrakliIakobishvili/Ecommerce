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
      return res.status(409).json("Email is already in use");
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
        res.status(200).json("Please Verify your Email");
      })
      .catch(function(error) {
        console.info(error);
        // User.findByIdAndRemove({ _id: newUser_id }, function(err, docs) {
        //   if (err) res.json(err);
        //   else console.log(docs);
        // });
        res.status(409).json("Email sending failed, try later");
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
      .then(users => {
        let _user = "";
        const filteredUsers = users.map(user => {
          _user = user[user.method];
          return {
            id: user._id,
            method: user.method,
            email: _user.email,
            password: _user.password,
            firstName: _user.firstName,
            lastName: _user.lastName,
            phone: _user.phone,
            day: _user.day,
            month: _user.month,
            year: _user.year,
            balance: _user.balance,
            verified: _user.verified
          };
        });
        res.json(filteredUsers);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res, next) {
    User.findById(req.params.id)
      .then(user => {
        let _user = "";
        _user = user[user.method];
        filteredUser = {
          id: user._id,
          method: user.method,
          email: _user.email,
          firstName: _user.firstName,
          lastName: _user.lastName,
          phone: _user.phone,
          day: _user.day,
          month: _user.month,
          year: _user.year,
          balance: _user.balance,
          verified: _user.verified
        };
        res.json(filteredUser);
      })
      .catch(() => res.status(422).json("Can't Find User"));
  },
  findByValue: (req, res, next) => {
    User.find({
      $or: [
        { "local.firstName": { $regex: req.params.value, $options: "i" } },
        { "google.firstName": { $regex: req.params.value, $options: "i" } },
        {
          "facebook.firstName": { $regex: req.params.value, $options: "i" }
        },
        { "local.lastName": { $regex: req.params.value, $options: "i" } },
        { "google.lastName": { $regex: req.params.value, $options: "i" } },
        {
          "facebook.lastName": { $regex: req.params.value, $options: "i" }
        },
        { "local.email": { $regex: req.params.value, $options: "i" } },
        { "google.email": { $regex: req.params.value, $options: "i" } },
        { "facebook.email": { $regex: req.params.value, $options: "i" } }
      ]
    }).exec(function(err, results) {
      let _user = "";
      const filteredUsers = results.map(user => {
        _user = user[user.method];
        return {
          id: user._id,
          method: user.method,
          email: _user.email,
          password: _user.password,
          firstName: _user.firstName,
          lastName: _user.lastName,
          phone: _user.phone,
          day: _user.day,
          month: _user.month,
          year: _user.year,
          balance: _user.balance,
          verified: _user.verified
        };
      });
      res.json(filteredUsers);
    });
  },
  update: function(req, res) {
    let method = req.body.method;
    // console.log(method);
    User.findOneAndUpdate(
      { _id: req.params.id },
      { local: req.body }
      // { [req.body.method]: req.body.user }
    )
      .then(user => res.json(user))
      .catch(err => res.status(422).json("Can't find User"));
  },
  remove: (req, res, next) => {
    User.findById({ _id: req.params.id })
      .then(user => user.remove())
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  profile: async (req, res, next) => {
    console.log("I managed to get here!");
    let loggedUser = await User.findOne({ _id: req.user.id });
    // console.log(req.user);
    loggedUser = loggedUser[loggedUser.method];

    // console.log(loggedUser);
    res.json({
      profilePageInfo: `Response From Server API | Email: ${
        loggedUser.email
      } Balance: ${loggedUser.balance}`
    });
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
