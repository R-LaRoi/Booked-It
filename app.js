const express = require("express");
const app = express();
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const userFavesModel = require("./models/userFavesSchema");
const userBooksModel = require("./models/bkListSchema");
const bookedItModel = require("./models/bookedItSchema");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "pug");

// main page ---- list all books from db
app.get("/", async (req, res) => {
  const allTitles = await bookedItModel.find();
  res.render("index", { allTitles });
});

// GET all titles JSON  -----
app.get("/booked_it", async (req, res) => {
  try {
    const mainList = await bookedItModel.find();
    res.status(200).json(mainList);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

//  GET all user titles JSON  -----
app.get("/user_booklist", async (req, res) => {
  try {
    const bkList = await userBooksModel.find();
    res.status(200).json(bkList);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

//  GET all user favorites JSON  -----
app.get("/user_favorites", async (req, res) => {
  try {
    const userFavorites = await userFavesModel.find();
    res.status(200).json(userFavorites);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

// user book list template with form
app.get("/user_list", async (req, res) => {
  try {
    const userTitles = await userBooksModel.find();

    res.render("userbooks", { userTitles });
  } catch (error) {
    console.error("User books are unavailable", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// add new book to user list
app.post("/addbook", async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await new userBooksModel(bookData);
    await newBook.save();
    res.send(`<body style="margin: 0; border: 30px solid #e99a00;">
    <main style="color: black; text-align: center; display: flex; justify-content: center; align-items: center; height: 100vh;">
        <div style="display: flex; flex-direction: row;">
            <div>
                <img src="https://github.com/user-attachments/assets/6b47a6d7-052e-4560-b2c0-e25de5b0e087" width="65%" />
            </div>
            <div style="margin-left: 20px;">
                <h1 style="color: black;">Woohoo! Another literary gem joins the treasure trove!</h1>
                <a style="text-decoration: none; display: inline-block; margin-top: 10px; width: 352px; height: 37px; border-radius: 25px; border: 0.5px solid rgb(184, 192, 180); color: whitesmoke; font-weight: bold; background-color: #1d1e1e; line-height: 37px;" href="/user_list">YOUR LIST</a>
                <a style="text-decoration: none; display: inline-block; margin-top: 10px; width: 352px; height: 37px; border-radius: 25px; border: 0.5px solid rgb(184, 192, 180); color: whitesmoke; font-weight: bold; background-color: #1d1e1e; line-height: 37px;" href="/">HOME</a>
            </div>
        </div>
    </main>
</body>`);
  } catch (error) {
    console.error("Error saving book:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

//  delete book from user list
app.post("/deletebook/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deleteBook = await userBooksModel.findByIdAndDelete(bookId);

    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", deleteBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

//  get user favorite list
app.get("/favorite_list", async (req, res) => {
  try {
    const userFaves = await userFavesModel.find();
    res.render("faveslist", { userFaves });
  } catch (error) {
    console.error("Favorites are unavailable", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

//  add to favorites list
app.post("/add_favorites/:id", async (req, res) => {
  try {
    let savedItem = req.params.id;
    const favoriteItem = await bookedItModel.findById(savedItem);

    const newFave = await new userFavesModel(favoriteItem);

    newFave._id = new mongoose.Types.ObjectId();
    newFave.isNew = true;
    await newFave.save();
    res.send(`<body style="margin: 0; border: 30px solid #2C2C2C;">
    <main style="color: black; text-align: center; display: flex; justify-content: center; align-items: center; height: 100vh;">
        <div style="display: flex; flex-direction: row;">
            <div>
                <img src="https://github.com/user-attachments/assets/f8d9a782-3831-4cda-aa89-c916a888b0f0" width="65%" />
            </div>
            <div style="margin-left: 20px;">
                <h1 style="color: black;">Eureka! Your fave struck gold in our treasure chest of awesomeness!</h1>
                <a style="text-decoration: none; display: inline-block; margin-top: 10px; width: 352px; height: 37px; border-radius: 25px; border: 0.5px solid rgb(184, 192, 180); color: whitesmoke; font-weight: bold; background-color: #E99A00; line-height: 37px;" href="/user_list">FAVORITES</a>
                <a style="text-decoration: none; display: inline-block; margin-top: 10px; width: 352px; height: 37px; border-radius: 25px; border: 0.5px solid rgb(184, 192, 180); color: whitesmoke; font-weight: bold; background-color: #E99A00; line-height: 37px;" href="/">HOME</a>
            </div>
        </div>
    </main>
</body>`);
  } catch (error) {
    console.error("Favorite not saved", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

//  delete favorite from faves list
app.post("/deletefavoritebook/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deleteBook = await userFavesModel.findByIdAndDelete(bookId);

    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", deleteBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on 3000`);
});

connectDB();
