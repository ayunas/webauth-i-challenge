exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "amir", password: "password" },
        { username: "sheena", password: "password" },
        { username: "sofia", password: "password" }
      ]);
    });
};
