const express = require("express"); // like from express import express
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser"); //middleware therefore connected by app.use
const keys = require("./config/keys");

require("./models/User");
require("./services/passport.js");

mongoose.connect(keys.mongoURI); //url to db
const app = express();

app.use(bodyParser.json()); //req.body is how this will be dispayed//middleware

app.use(
  //middleware
  cookieSession({
    maxAge: 2592000000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

//changes for production
if (process.env.NODE_ENV === "production") {
  // express will serve up production assets
  //ie main.js file
  app.use(express.static("client/build")); //ie if the route is not recognized, look into client/build

  //express will handle index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/* dynamic port binding */
const PORT = process.env.PORT || 4000; // runtime variable, ie when its beginnning to be executed, heroku gives port. however only fully works in prod. if in dev use static port
app.listen(PORT);
