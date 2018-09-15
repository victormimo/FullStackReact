const passport = require("passport");

//Initial route handler to kick off
//this route handler is saying, at "auth/google have passport start up with strategy google." with a get request

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      //  /authenticate a user with the strategy called google
      scope: ["profile", "email"]
    })
  );

  //callback route handler - the reason why this one is much shorter is because after callback itll have thecode immediately after in the URL, sopassport knows to take that thecode
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  //this is the first call that has anything todowith cookie.
  app.get("/api/current_user", (req, res) => {
    //below line not showing uprightnow
    res.send(req.user); //req.user is simply the user making the request, what were doing hereis seeing if the encryption of using cookies isworking
  });
};
