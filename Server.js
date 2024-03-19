const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/ToDoRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: "https://todoappfrontend-six.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://aiswaryasangeetha015:cAymiVutSmirZeve@cluster0.bqraikd.mongodb.net/todoapp"
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/", routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
