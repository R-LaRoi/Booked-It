const express = require("express");
const app = express();
const connectDB = require("./config/db");
const port = 3000;
const path = require("path");
const userFavesModel = require("./models/userFavesSchema");
const collection = require("./models/bkListSchema");
const bookedItModel = require("./models/bookedItSchema");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

// main page ---- will list books from db
app.get("/", (req, res) => {
  res.render("index", {
    title: "Booked It",
  });
});

app.get("/booked_it", async (req, res) => {
  try {
    let mainList = await bookedItModel.find();
    res.status(200).json(mainList);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

// show user reading list
app.get("/user_book_list", async (req, res) => {
  try {
    let bkList = await collection.find();
    res.status(200).json(bkList);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

// show user favorites
app.get("/user_favorites", async (req, res) => {
  try {
    let userFavorites = await userFavesModel.find();
    res.status(200).json(userFavorites);
  } catch (error) {
    res.status(500).json({ error: "Books are unavailable." });
  }
});

app.get("/user_list", function (req, res) {
  res.render("userbooks");
});

app.post("/add_book", async (req, res) => {
  try {
    const formData = req.body;
    const newBook = new routineModel(formData);
    await newBook.save();
    res.send(`
      <body style="background-color: #242424">
        <main>
          <div style="display: flex; flex-direction: column">
            <h1>book list</h1>
            <p>your book has been added!</p>
            <div>${formData.date}</div>
            <div>${formData.title}</div>
            <div>${formData.author}</div>
            <div>${formData.comments}</div>
            <br><br>
            <a style="text-decoration: none; background: transparent; border: 1px solid white; border-radius:10px; padding:5px; color:white;" href="/routines">View Routines</a>
          </div>
        </main>
      </body>
    `);
  } catch (error) {
    console.error("Error saving routine", error);
    res.status(500).json({ message: "Error saving routine", error });
  }
});

app.listen(port, () => {
  console.log(`Server listening on 3000`);
});

connectDB();
