const express = require("express");
const router = express.Router();
const dbHelper = require("./dbHelper");
const encrypt = require("bcryptjs");
const auth = require("./authMiddleware");

router.get("/", (req, res) => {
  res.status(200).json({ message: "the router is working" });
});

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = encrypt.hashSync(user.password, 10);
  user.password = hash;

  dbHelper
    .register(user)
    .then(id => {
      res.status(200).json(`user: ${user.username} created with id # ${id}`);
    })
    .catch(error => {
      res.status(500).json(error.message);
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
//         res.status(200).json({ message: `Welcome, ${user.username}` });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err.message);
//     });
// });

router.post("/login", auth.authenticate, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  dbHelper
    .login(username)
    .first()
    .then(user => {
      if (user && encrypt.compareSync(password, user.password)) {
        req.session.user = user; //how does this session object look like?
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/users", auth.authenticate, (req, res) => {
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

module.exports = router;
