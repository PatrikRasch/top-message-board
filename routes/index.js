var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("message", { title: "Express", messages: messages });
});

router.get("/new", function (req, res, next) {
  res.render("form", { heading: "heading", author: "author", message: "message" });
});

router.post("/new", (req, res) => {
  messages.push({ text: req.body.messageText, user: req.body.messageUser, added: new Date() });
  res.redirect("/");
});

module.exports = router;
