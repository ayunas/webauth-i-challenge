const express = require("express");
const router = express.Router();
const dbHelper = require("./dbHelper");
const encrypt = require("bcryptjs");
const auth = require("./authMiddleware");

router.get("/", (req, res) => {
  res.status(200).json({ message: "the router is working" });
});

router.post("/register", (req, res) => {
  const hash = encrypt.hashSync(req.headers.password, 10);
  req.session.username = req.headers.username;
  req.session.password = hash;

  const user = {
    username: req.session.username,
    password: req.session.password
  };

  dbHelper
    .register(user)
    .then(id => {
      res.status(200).json(`user: ${user.username} created with id # ${id}`);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.post("/login", auth.authenticate, (req, res) => {
  // const username = req.headers.username;
  if (req.session && req.session.username) {
    res.status(200).json({
      message: `Welcome, ${req.session.username}, you now have a cookie`
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send("you can checkout anytime, but you can never leave");
      } else {
        res.send("bye");
      }
    });
  } else {
    res.end();
  }
});

router.get("/users", auth.userRequest, (req, res) => {
  dbHelper
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/users/:id", auth.authenticateUser, (req, res) => {
  dbHelper
    .getUser(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: `user with id # ${
            req.params.id
          } was not found in the database`
        });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// router.post("/login", auth.authenticate, (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   dbHelper
//     .login(username)
//     .first()
//     .then(user => {
//       if (user && encrypt.compareSync(password, user.password)) {
//         req.session.user = user; //how does this session object look like?
//         res.status(200).json({ message: `Welcome ${user.username}` });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error.message);
//     });
// });

module.exports = router;
