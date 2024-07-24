const express = require("express");
const app = express();
const connectDB = require("./config/db");
const port = 3000;
const path = require("path");
const userFavesModel = require("./models/userFavesSchema");
const userBooksModel = require("./models/bkListSchema");
const bookedItModel = require("./models/bookedItSchema");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

// main page ---- will list books from db
app.get("/", async (req, res) => {
  let allTitles = await bookedItModel.find();
  console.log(allTitles);

  res.render("index", { allTitles });
});

app.get("/routines", async function (req, res) {});

// GET all titles JSON  -----
app.get("/booked_it", async (req, res) => {
  try {
    let mainList = await bookedItModel.find();
    res.status(200).json(mainList);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

//  GET all user titles JSON  -----
app.get("/user_booklist", async (req, res) => {
  try {
    let bkList = await userBooksModel.find();
    res.status(200).json(bkList);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

//  GET all user favorites JSON  -----
app.get("/user_favorites", async (req, res) => {
  try {
    let userFavorites = await userFavesModel.find();
    res.status(200).json(userFavorites);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

// user book list template with form
app.get("/user_list", async (req, res) => {
  try {
    let userTitles = await userBooksModel.find();
    console.log(userTitles);
    res.render("userbooks", { userTitles });
  } catch (error) {}
});

app.delete("/deletebook/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deleteBook = await userBooksModel.findByIdAndDelete(bookId);

    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", deleteBook });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server listening on 3000`);
});

connectDB();
