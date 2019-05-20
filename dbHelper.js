const db = require("./data/dbConfig");

function getUsers() {
  return db("users");
}

function getUser(userID) {
  return db("users")
    .where({ id: userID })
    .first();
}

function register(newUser) {
  return db("users").insert(newUser);
}

function login(username) {
  return db("users").where({ user: username });
}

module.exports = {
  getUsers,
  getUser,
  register,
  login
};
