const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body; //remember that we pass this from front end along with other info from react

    const survey = new Survey({
      //new instance of surveys
      title, // remember this is new syntax for : title: title
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      //dont need to worry about yes and no bc they have default values
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send(); //async
      //save survey to db, also async
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

// const survey = {title: 'my title', subject: "lfd subject" , recipients: 'victormimoc@gmail.com', body: 'sdfsfdfsdfdsfds'};
