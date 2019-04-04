const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const config = require("./configuration");
const User = require("./models/user");

// JSON WEB TOKENS STRATEGY
passport.use(
  "user-rule",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: config.JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// JSON WEB TOKENS STRATEGY FOR ADMIN
passport.use(
  "admin-rule",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: config.JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user || user.isAdmin !== true) {
          return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: config.oauth.google.clientID,
      clientSecret: config.oauth.google.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Should have full user profile over here
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            balance: 0,
            verified: true
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: config.oauth.facebook.clientID,
      clientSecret: config.oauth.facebook.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            balance: 0,
            verified: true
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          // return done(null, false);
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
