const express = require("express");
const router = express.Router();
const dbHelper = require("./dbHelper");
const db = require("./data/dbConfig");

router.get("/", (req, res) => {
  res.status(200).json({ message: "the router is working" });
});

router.get("/users", (req, res) => {
  //   dbHelper
  //     .getUsers()
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/login", (req, res) => {});

router.post("/register", (req, res) => {});

module.exports = router;
