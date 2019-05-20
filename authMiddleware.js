const encrypt = require("bcryptjs");
const dbHelper = require("./dbHelper");

function authenticate(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (username && password) {
    dbHelper
      .login(username)
      .first()
      .then(user => {
        if (user && encrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error.message);
      });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

module.exports = authenticate;
