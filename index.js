const express = require("express"); // like from express import express
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport.js");

mongoose.connect(keys.mongoURI); //url to db

const app = express();
authRoutes(app); //calling routes to

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* dynamic port binding */
const PORT = process.env.PORT || 4000; // runtime variable, ie when its beginnning to be executed, heroku gives port. however only fully works in prod. if in dev use static port
app.listen(PORT);
