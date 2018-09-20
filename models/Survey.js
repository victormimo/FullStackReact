const mongoose = require("mongoose");
const { Schema } = mongoose; // same as const Schema = mongoose.Schema;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" }, //underscore is convention to set up relationship
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);

//when it goes down the argument list of the schema, itll look at the recipients and know it has to go into Recipient
//and obey that schema
