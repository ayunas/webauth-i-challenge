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
  console.log("%cnewuser", "color:blue; font-size:16px;", newUser);
  // return db("users")
  //   .where({ username: newUser.username })
  //   .then(id => {
  //     res.status(404).json({ message: `${res} username taken` });
  //   })
  //   .catch(() => {
  //     return db("users").insert(newUser);
  //   });

  return db("users").insert(newUser);
}

function login(username) {
  return db("users").where({ username: username });
}

module.exports = {
  getUsers,
  getUser,
  register,
  login
};
