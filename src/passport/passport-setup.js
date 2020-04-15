const passport = require("passport");
var LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var LocalStrategy = require("passport-local").Strategy;
const keys = require("../passport/keys");

passport.use(
  new LinkedInStrategy(
    {
      // options for linkedin strategy
      clientID: keys.linkedin.clientID,
      clientSecret: keys.linkedin.clientSecret,
      callbackURL: "/auth/linkedin/redirect",
      scope: ["r_emailaddress", "r_basicprofile"],
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      // options for facebook strategy
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
      callbackURL: "/auth/facebook/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      console.log(accessToken," - ",refreshToken);
      done(null, profile);
    }
  )
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    done(null, username);
    
    //     User.findOne({ username: username }, function (err, user) {
    //       if (err) {
    //         return done(err);
    //       }
    //       if (!user) {
    //         return done(null, false, { message: "Incorrect username." });
    //       }
    //       if (!user.validPassword(password)) {
    //         return done(null, false, { message: "Incorrect password." });
    //       }
    //       return done(null, user);
    //     });
    //   }
  })
);
