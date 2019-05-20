const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.status(200).send(`
    <h2>Welcome to Authentication</h2>
    <p>This App allows you to view, add, and remove users from the SQLite database.</p>
    <p>This app also displays user authentication and user registration and login functionality</p>
    `);
});

module.exports = server;
