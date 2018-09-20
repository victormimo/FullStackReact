const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  // ermember that mialer is not specfic to survey but want to use in future
  //remember that in js whenever we invoke a new class with new Mailer(..) itll call a constructor
  constructor({ subject, recipients }, content) {
    super(); // need to review this

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email("no-reply@emaily.com"); //helper function from sendgrid
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //helper function to add content to the body of the email
    //enable clicktracking
    this.addClickTracking();
    //take formatted list and register with sendgrid
    this.addRecipients();
  }

  //function to ensure that only the emails are return from the object
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email); // recipents is currently a string. making it an email object from sendgrid helper
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  //anytime doing an api call its async!
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
