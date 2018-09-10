const express = require("express"); // like from express import express

const app = express();

app.get("/loc", (req, res) => {
  res.send({ hi: "there" }); //this is sort of out db right now and and accessing the browser is out using the GET request
});

/* dynamic port binding */
const PORT = process.env.PORT || 8000; // runtime variable, ie when its beginnning to be executed, heroku gives port. however only fully works in prod. if in dev use static port
app.listen(PORT);
