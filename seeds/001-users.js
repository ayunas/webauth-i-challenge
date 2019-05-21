const bcrypt = require("bcryptjs");
const hashedPassword1 = bcrypt.hashSync('password', 10);
const hashedPassword2 = 
const hashedPassword3 = 


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries


  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "amir", password: bcrypt.hashSync('password', 10) },
        { username: "sheena", password: "password" },
        { username: "sofia", password: "password" }
      ]);
    });
};


//