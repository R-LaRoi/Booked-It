const mongoose = require("mongoose");

const userFavesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  comments: { type: String, required: true },
});

const userFavesModel = mongoose.model("user_favorites", userFavesSchema);

module.exports = userFavesModel;
