exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { user: "amir", password: "password" },
        { user: "sheena", password: "password" },
        { user: "sofia", password: "password" }
      ]);
    });
};
