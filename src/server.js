require("dotenv").config();
const express = require("express");
const http = require("http");
const next = require("next");
const session = require("express-session");
const passport = require("passport");
const keys = require("./passport/keys");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./passport/passport-setup");
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./src",
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.urlencoded());

  // Parse JSON bodies (as sent by API clients)
  server.use(express.json());
  // 2 -
  const sessionConfig = {
    secret: keys.session.cookieKey,
    cookie: {
      maxAge: 86400 * 1000, // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true,
  };
  server.use(session(sessionConfig));

  // 4 - configuring Passport
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // 5 - adding Passport and authentication routes
  server.use(passport.initialize());
  server.use(passport.session());
  server.use("/auth", authRoutes);

  // 6 - you are restricting access to some routes
  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/auth/login");
    next();
  };

  server.use("/profile", restrictAccess);

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(3000, () => {
    console.log(`listening on port ${3000}`);
  });
});
