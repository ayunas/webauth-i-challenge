const encrypt = require("bcryptjs");
const dbHelper = require("./dbHelper");

// function authenticate(req, res, next) {
//   const username = req.headers.username;
//   const password = req.headers.password;

//   if (username && password) {
//     dbHelper
//       .login(username)
//       .first()
//       .then(user => {
//         if (user && encrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "Invalid Credentials" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error.message);
//       });
//   } else {
//     res.status(400).json({ message: "No credentials provided" });
//   }
// }

function authenticate(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass" });
  }
}

function authenticateUser(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  const id = req.params.id;

  if (username && password) {
    dbHelper
      .getUser(id)
      .then(user => {
        if (user && encrypt.compareSync(password, user.password)) {
          console.log(typeof id, id, typeof String(user.id), user.id);
          if (id == user.id) {
            //did loose equality to account for different types
            next();
          } else {
            res.status(401).json({ message: "Unauthorized User" });
          }
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

module.exports = { authenticate, authenticateUser };
