const mongoose = require("mongoose");
const { Schema } = mongoose; // same as const Schema = mongoose.Schema;

const userSchema = new Schema({
  //while schemaless mongoose requires you to declare all attributes
  googleID: String, // ie all our model instances so far only have googleid
  credits: { type: Number, default: 0 } //when defining schema you can either define type or a custom one through an object
});

mongoose.model("users", userSchema); // creates model class, w 2 arguments youll pass it to monggose, w 1 youll read it?
