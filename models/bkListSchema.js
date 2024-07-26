const mongoose = require("mongoose");

const userBooksSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: String,
    required: true,
    maxlength: [50, "Entry cannot be more than 50 characters"],
  },
  date_added: { type: String, required: true, default: Date.now },
});

userBooksSchema.index({ title: -1 });

const userBooksModel = mongoose.model("user_book_list", userBooksSchema);

module.exports = userBooksModel;
