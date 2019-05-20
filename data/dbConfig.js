const knex = require("knex");

const knexDBSettings = require("../knexfile").development;

const db = knex(knexDBSettings);

module.exports = db;
