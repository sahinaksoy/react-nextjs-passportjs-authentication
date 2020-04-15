const router = require("express").Router();
const passport = require("passport");

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with linkedin+
router.get("/linkedin", passport.authenticate("linkedin"));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  "/linkedin/redirect",
  passport.authenticate("linkedin"),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/profile");
  }
);

// auth with linkedin+
router.get("/facebook", passport.authenticate("facebook"));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/profile");
  }
);

//handle post login
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  function (req, res) {
    res.redirect("/profile");
  }
);

module.exports = router;
