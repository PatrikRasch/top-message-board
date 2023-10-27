var express = require("express");
var router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.MONGODB_URL;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const messageSchema = new mongoose.Schema({
  text: String,
  user: String,
  added: Date,
});

const Message = mongoose.model("Message", messageSchema);

const messages = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  Message.find()
    .then((messages) => {
      res.render("message", { title: "Express", messages: messages });
    })
    .catch((err) => {
      console.error("Error fetching messages from MongoDB:", err);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/new", function (req, res, next) {
  res.render("form", { heading: "heading", author: "author", message: "message" });
});

router.post("/new", (req, res) => {
  const newMessage = new Message({
    text: req.body.messageText,
    user: req.body.messageUser,
    added: new Date(),
  });
  newMessage
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error("Error saving message to MongoDB:", error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
