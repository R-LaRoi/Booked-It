const express = require("express");
const app = express();
const connectDB = require("./config/db");
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.get("/", (req, res) => {
  res.render("index", {
    title: "Booked It",
  });
});

app.listen(port, () => {
  console.log(`Server listening on 3000`);
});

connectDB();
