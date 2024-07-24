const mongoose = require("mongoose");

const userBooksSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date_added: { type: String, required: true },
});

const userBooksModel = mongoose.model("user_book_list", userBooksSchema);

module.exports = userBooksModel;
