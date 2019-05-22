const encrypt = require("bcryptjs");
const dbHelper = require("./dbHelper");

function authenticate(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (!req.session.username === req.headers.username) {
    res.json({ message: "please login" });
  }

  if (username && password) {
    dbHelper
      .login(username)
      .first()
      .then(user => {
        if (user && encrypt.compareSync(password, user.password)) {
          req.session.username = user.username;
          //a cookie is sent by the express-session library
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

function userRequest(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden from accessing that resource" });
  }
}

// function authenticate(req, res, next) {
//   //if there is no session, then the user is not logged in
//   if (req.session && req.session.username) {
//     next();
//   } else {
//     res.status(401).json({ message: "please login to access resource" });
//   }
// }

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

// function authenticate(req, res, next) {
//   if (req.session && req.session.user) {
//     next();
//   } else {
//     res.status(401).json({ message: "You shall not pass" });
//   }
// }

// function authenticateUser(req,res,next) {
//     const id = req.params.id;
//     if (req.session )
// }

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

module.exports = { authenticate, authenticateUser, userRequest };
