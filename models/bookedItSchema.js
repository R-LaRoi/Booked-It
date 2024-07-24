const mongoose = require("mongoose");

const bookedItSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

const bookedItModel = mongoose.model("book_suggestions", bookedItSchema);

module.exports = bookedItModel;
