const mongoose = require("mongoose");
const { Schema } = mongoose; // same as const Schema = mongoose.Schema;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema; // this isnt a model because we dont want to register it with mogoose
