const express = require("express");
const cors = require("cors");
const router = require("./router");
const session = require("express-session"); //sets up session and creates cookie
// const SessionStore = require("connect-session-knex")(session); //to store in the database.
// const SessionStore = require("connect-dynamodb")(session);
// var SQLiteStore = require('connect-sqlite3')(express);
require("dotenv").config();

const bodyParser = express.json();

const server = express();

// const sessionTable = {
//   knex: require("./data/dbConfig"),
//   tablename: "sessions",
//   sidfieldname: "sid",
//   createtable: "true",
//   clearInterval: 1000 * 60 * 60
// };

const sessionConfig = {
  //this is for the express-session
  secret: process.env.SECRET, //this is to add an additional layer of security.  encrypt the session config info.
  // secret: "this is the secret key",
  cookie: {
    maxAge: 1000 * 60 * 60, //1 hour time limit for session to last units are milliseconds
    secure: false, // https not required
    httpOnly: true //cannot manipulate the cookie by using JS
  },
  resave: false, //if set to true, session will be recreated, even those tht have not changed.
  saveUninitialized: false // prevents from automatically setting cookies without permission from user
  // store: new SessionStore(sessionTable)
};

server.use(bodyParser, cors(), session(sessionConfig));
server.use("/api", router);

server.get("/", (req, res) => {
  console.log("process.env.SECRET", process.env.SECRET);
  res.status(200).send(`
    <h2>Welcome to Authentication</h2>
    <p>This App allows you to view, add, and remove users from the SQLite database.</p>
    <p>This app also displays user authentication and user registration and login functionality</p>
    `);
});

module.exports = server;
