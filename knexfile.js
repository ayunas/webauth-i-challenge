// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/authentication.sqlite3" //knex assumes you are working from the root directory of the project
    },
    useNullAsDefault: true,

    migrations: {
      directory: "./data/migrations"
    },

    seeds: {
      directory: "./data/seeds"
    }
  }
};
