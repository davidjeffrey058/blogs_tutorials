const express = require("express");
// const morgan = require('morgan');
const mongoose = require("mongoose");
const blogRoute = require("./routes/blogRoutes");
const blogApiRoute = require('./routes/blogApiRoutes');
const Blog = require("./models/blog");

// ABOUT THE 3RD PARTY PACKAGES
// - express simplify our connection as compared to raw node.js
// - mongoose helps in the conection of the mongodb

//express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to mongoDb
const dbURI =
  "mongodb+srv://davidjeffrey:fucker200@cluster0.nmreu71.mongodb.net/note-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// blog routes
app.use("/blogs", blogRoute);

// blog api routes
app.use("/blogs-api", blogApiRoute);

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

//404
//NB: This should always be at the bottom of the code
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
